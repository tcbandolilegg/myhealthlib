import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepositories from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth: string;
  address: string;
  address_two?: string;
  city: string;
  uf: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(userData: IRequest): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(
      userData.email,
    );

    if (checkEmailExists) {
      throw new AppError('Email address already used.');
    }

    const checkCpfExists = await this.usersRepository.findByCpf(userData.cpf);

    if (checkCpfExists) {
      throw new AppError('This CPF already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(
      userData.password,
    );

    const user = await this.usersRepository.create({
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      birth: userData.birth,
      address: userData.address,
      address_two: userData.address_two,
      city: userData.city,
      uf: userData.uf,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
