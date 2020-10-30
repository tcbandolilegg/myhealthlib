import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import CreateExamsService from './CreateUserExamService';

let fakeExamsRepository: FakeExamsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeStorageProvider: FakeStorageProvider;
let createUser: CreateUserService;
let createExam: CreateExamsService;

describe('CreateExam', () => {
  beforeEach(() => {
    fakeExamsRepository = new FakeExamsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeStorageProvider = new FakeStorageProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createExam = new CreateExamsService(
      fakeUsersRepository,
      fakeExamsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new exam', async () => {
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

    const exam = await createExam.execute({
      user_id: user.id,
      examFilename: 'Exam example',
      description: 'Any description',
    });

    expect(exam).toHaveProperty('id');
    expect(exam.user_id).toBe(user.id);
  });
  it('should notbe able to create a new exam with a desauthenticated user', async () => {
    await expect(
      createExam.execute({
        user_id: 'non-valid-user-id',
        examFilename: 'Exam example',
        description: 'Any description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
