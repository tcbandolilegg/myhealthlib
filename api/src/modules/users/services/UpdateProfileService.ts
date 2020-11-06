import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepositories from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  cpf?: string;
  birth?: string;
  address?: string;
  address_two?: string;
  city?: string;
  uf?: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepositories,

    @inject('HashProvider')
    private hashPRovider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    cpf,
    birth,
    address,
    address_two,
    city,
    uf,
    password,
    old_password,
    user_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already exists');
    }

    user.name = name;
    user.email = email;

    if (cpf) {
      user.cpf = cpf;
    }

    if (birth) {
      user.birth = birth;
    }

    if (address) {
      user.address = address;
    }

    if (address_two) {
      user.address_two = address_two;
    }

    if (city) {
      user.city = city;
    }

    if (uf) {
      user.uf = uf;
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to informe the old password from set ne new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashPRovider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await this.hashPRovider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
