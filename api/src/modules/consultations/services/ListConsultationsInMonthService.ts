import { injectable, inject } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

type IConsultation = Array<{
  id: string;
  user_id: string;
  doctor: string;
  specialty: string;
  description: string;
  date: Date;
}>;

type IResponse = Array<{
  day: number;
  consultations: IConsultation | undefined;
}>;

/*
  - Return
  [
    {
      day: 1,
      consultations: [
        {
          id: string,
          user_id: string,
          doctor: Example,
          specialty: Example,
          description: Example,
          date: 2020-11-20T12:00:00
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

  public async execute({ user_id, month, year }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const consultations = await this.consultationsRepository.findAllConsultationsInMonth(
      {
        user_id: user.id,
        year,
        month,
      },
    );

    console.log(consultations);

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const createdConsultations: IResponse = [];

    eachDayArray.forEach(day => {
      const consultationsInDay = consultations.map(consult => {
        if (getDate(consult.date) === day) {
          return consult;
        }
      });

      console.log(consultationsInDay);

      // createdConsultations.push({
      // day,
      // consultations: consultationsInDay,
      // })
    });

    console.log(createdConsultations);

    // return createdConsultations;

    return [
      {
        day: 1,
        consultations: [
          {
            id: 'string',
            user_id: 'string',
            doctor: 'Example',
            specialty: 'Example',
            description: 'Example',
            date: new Date(),
          },
          {
            id: 'string',
            user_id: 'string',
            doctor: 'Example',
            specialty: 'Example',
            description: 'Example',
            date: new Date(),
          },
        ],
      },
      {
        day: 2,
        consultations: [
          {
            id: 'string',
            user_id: 'string',
            doctor: 'Example',
            specialty: 'Example',
            description: 'Example',
            date: new Date(),
          },
          {
            id: 'string',
            user_id: 'string',
            doctor: 'Example',
            specialty: 'Example',
            description: 'Example',
            date: new Date(),
          },
        ],
      },
    ];
  }
}

export default ListConsultationsInMonthService;
