import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
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

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
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

    await expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        address: 'Address example',
        address_two: 'Address complement',
        city: 'Los Angeles',
        uf: 'Cal',
        cpf: '123456778912',
        birth: '12/34/5678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same cpf from another', async () => {
    await createUser.execute({
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

    await expect(
      createUser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
        address: 'Address example',
        address_two: 'Address complement',
        city: 'Los Angeles',
        uf: 'Cal',
        cpf: '123456778912',
        birth: '12/34/5678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
