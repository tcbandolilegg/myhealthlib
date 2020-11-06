// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeConsultationsRepository from '../repositories/fakes/FakeConsultationsRepository';

import ListConsultationsMonthAvailabilityService from './ListConsultationsMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeConsultationsRepository: FakeConsultationsRepository;
let listConsultationsInMonth: ListConsultationsMonthAvailabilityService;

describe('ListConsultationsInMonth', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeConsultationsRepository = new FakeConsultationsRepository();

    listConsultationsInMonth = new ListConsultationsMonthAvailabilityService(
      fakeUsersRepository,
      fakeConsultationsRepository,
    );
  });

  it('should be able to list consultations on the month', async () => {
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

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Trê',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 8, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 9, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 10, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 11, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 12, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 13, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 14, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 15, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 16, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qua',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 17, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Qui',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 21, 8, 0, 0),
    });

    const consultations = await listConsultationsInMonth.execute({
      user_id: user.id,
      year: 2020,
      month: 11,
    });

    expect(consultations).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
