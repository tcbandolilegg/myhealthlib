import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepositories from '@modules/users/repositories/IUsersRepository';

import Consultation from '../infra/typeorm/entities/Consultation';
import IConsultationsRepository from '../repositories/IConsultationsRepository';

interface IRequest {
  user_id: string;
  doctor: string;
  specialty: string;
  description: string;
  date: Date;
}

@injectable()
class CreateConsultationService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUsersRepositories,

    @inject('ConsultationsRepository')
    private consultationsRepository: IConsultationsRepository,
  ) {}

  public async execute({
    user_id,
    doctor,
    specialty,
    description,
    date,
  }: IRequest): Promise<Consultation> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User non-exists.', 401);
    }

    const consultation = await this.consultationsRepository.create({
      user_id,
      doctor,
      specialty,
      description,
      date,
    });

    return consultation;
  }
}

export default CreateConsultationService;
