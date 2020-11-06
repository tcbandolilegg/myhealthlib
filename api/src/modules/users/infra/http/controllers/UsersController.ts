import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cpf,
      birth,
      address,
      address_two,
      city,
      uf,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      cpf,
      birth,
      address,
      address_two,
      city,
      uf,
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
