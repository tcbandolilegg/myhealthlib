import { container } from 'tsyringe';

import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ConsultationsRepository from '@modules/consultations/infra/typeorm/repositories/ConsultationsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import ExamsRepository from '@modules/exams/infra/typeorm/repositories/ExamsRepository';

container.registerSingleton<IConsultationsRepository>(
  'ConsultationsRepository',
  ConsultationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IExamsRepository>(
  'ExamsRepository',
  ExamsRepository,
);
