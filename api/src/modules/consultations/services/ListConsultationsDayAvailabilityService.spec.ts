// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeConsultationsRepository from '../repositories/fakes/FakeConsultationsRepository';

import ListConsultationsDayAvailabilityService from './ListConsultationsDayAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeConsultationsRepository: FakeConsultationsRepository;
let listConsultationsInDay: ListConsultationsDayAvailabilityService;

describe('ListConsultationsInMonth', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeConsultationsRepository = new FakeConsultationsRepository();

    listConsultationsInDay = new ListConsultationsDayAvailabilityService(
      fakeUsersRepository,
      fakeConsultationsRepository,
    );
  });

  it('should be able to list consultations on the day', async () => {
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
      date: new Date(2020, 10, 20, 14, 0, 0),
    });

    await fakeConsultationsRepository.create({
      user_id: user.id,
      doctor: 'Jhon Trê',
      specialty: 'Example',
      description: 'Example',
      date: new Date(2020, 10, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 20, 11).getTime();
    });

    const consultations = await listConsultationsInDay.execute({
      user_id: user.id,
      year: 2020,
      month: 11,
      day: 20,
    });

    expect(consultations).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
