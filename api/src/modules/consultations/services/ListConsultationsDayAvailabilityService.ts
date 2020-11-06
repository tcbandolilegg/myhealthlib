import { injectable, inject } from 'tsyringe';
import { isAfter, getHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListConsultationsDayAvailabilityService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ConsultationsRepository')
    private consultationsRepository: IConsultationsRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const consultations = await this.consultationsRepository.findAllConsultationsInDay(
      {
        user_id: user.id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());
    const availabilty = eachHourArray.map(hour => {
      const hasConsultInHour = consultations.find(
        consult => getHours(consult.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasConsultInHour && isAfter(compareDate, currentDate),
      };
    });

    return availabilty;
  }
}

export default ListConsultationsDayAvailabilityService;
