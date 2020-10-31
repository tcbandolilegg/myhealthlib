import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeConsultationsRepository from '../repositories/fakes/FakeConsultationsRepository';

import ListConsultationsService from './ListConsultationsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeConsultationsRepository: FakeConsultationsRepository;
let listConsultations: ListConsultationsService;

describe('ListConsultations', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeConsultationsRepository = new FakeConsultationsRepository();

    listConsultations = new ListConsultationsService(
      fakeUsersRepository,
      fakeConsultationsRepository,
    );
  });

  it('should be able to list the consultations', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      address: 'Address example',
      address_two: 'Address complement',
      city: 'Los Angeles',
      uf: 'Cal',
      cpf: '123456778912',
      birth: '12/34/5678',
      password: '123456',
    });

    const consultation1 = await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Trê',
      specialty: 'Example',
      description: 'Example',
      date: new Date(),
    });

    const consultation2 = await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(),
    });

    const consultations = await listConsultations.execute({
      user_id: user.id,
    });

    expect(consultations).toEqual([consultation1, consultation2]);
  });
});
