import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
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
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
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
    });

    delete user.password;

    return response.json(user);
  }
}

export default ProfileController;
