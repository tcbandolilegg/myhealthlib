import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

/*
  - Return
  [
    {
      day: 1,
      consultations: [
        {
          doctor: Example,
          specialty: Example,
          description: Example,
          hour: 12:00
        }
      ]
    }
  ]
*/

@injectable()
class ListConsultationsInMonthService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ConsultationsRepository')
    private consultationsRepository: IConsultationsRepository,
  ) {}

  public async execute({
    user_id,
    month,
    year,
  }: IRequest): Promise<Consultation[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const consultations = await this.consultationsRepository.findAllConsultations(
      user.id,
    );

    return consultations;
  }
}

export default ListConsultationsInMonthService;
