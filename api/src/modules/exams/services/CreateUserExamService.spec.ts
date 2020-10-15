import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeExamsRepository from '../repositories/fakes/FakeExamsRepository';
import CreateExamsService from './CreateUserExamService';

describe('CreateExam', () => {
  it('should be able to create a new exam', async () => {
    const fakeExamsRepository = new FakeExamsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const createExam = new CreateExamsService(
      fakeUsersRepository,
      fakeExamsRepository,
    );

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
    const fakeExamsRepository = new FakeExamsRepository();
    const fakeUsersRepository = new FakeUsersRepository();

    const createExam = new CreateExamsService(
      fakeUsersRepository,
      fakeExamsRepository,
    );

    expect(
      createExam.execute({
        user_id: 'non-valid-user-id',
        examFilename: 'Exam example',
        description: 'Any description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
