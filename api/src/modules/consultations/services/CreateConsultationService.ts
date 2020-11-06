import { inject, injectable } from 'tsyringe';
import { isBefore, startOfHour } from 'date-fns';

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
    const consultDate = startOfHour(date);

    if (isBefore(consultDate, Date.now())) {
      throw new AppError("You can't create an consultation on a past date");
    }

    if (!user) {
      throw new AppError('User non exists.', 401);
    }

    const findConsultaInSameDate = await this.consultationsRepository.findByDate(
      date,
      user_id,
    );

    if (findConsultaInSameDate) {
      throw new AppError('This consultation is already booked');
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
