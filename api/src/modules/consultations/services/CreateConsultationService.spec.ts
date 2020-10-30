import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import FakeConsultationsRepository from '../repositories/fakes/FakeConsultationsRepository';
import CreateConsultationService from './CreateConsultationService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

let fakeConsultationsRepository: FakeConsultationsRepository;
let createConsultation: CreateConsultationService;

describe('CreateConsultation', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    fakeConsultationsRepository = new FakeConsultationsRepository();
    createConsultation = new CreateConsultationService(
      fakeUsersRepository,
      fakeConsultationsRepository,
    );
  });

  it('should be able to create a new consultation', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      address: 'Address example',
      address_two: 'Address complement',
      city: 'Los Angeles',
      uf: 'Cal',
      cpf: '123456778912',
      birth: '12/34/5678',
      password: '123456',
    });

    const consultation = await createConsultation.execute({
      user_id: user.id,
      doctor: 'Jhon Doe',
      specialty: 'Medical',
      description: 'Any description',
      date: new Date(),
    });

    expect(consultation).toHaveProperty('id');
    expect(consultation.user_id).toBe(user.id);
  });

  it('should not be able to create a new consultation ', async () => {
    await expect(
      createConsultation.execute({
        user_id: 'non-existing',
        doctor: 'Jhon Doe',
        specialty: 'Medical',
        description: 'Any description',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
