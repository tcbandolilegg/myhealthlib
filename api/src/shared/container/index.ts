import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ConsultationsRepository from '@modules/consultations/infra/typeorm/repositories/ConsultationsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

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

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
