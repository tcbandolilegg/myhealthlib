import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Exam from '../infra/typeorm/entities/Exam';
import IExamsRepository from '../repositories/IExamsRepository';

interface IRequest {
  user_id: string;
  examFilename: string;
  description: string;
}

@injectable()
class CreateUserExamService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    examFilename,
    description,
  }: IRequest): Promise<Exam> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenitcated users can add exams.', 401);
    }

    const filename = await this.storageProvider.saveFile(examFilename);

    const exam = await this.examsRepository.create({
      user_id,
      exam: filename,
      description,
    });

    return exam;

    // try {
    //   const exam = await this.examsRepository.create({
    //     user_id,
    //     exam: examFilename,
    //     description,
    //   });

    //   return exam;
    // } catch (error) {
    //   throw new AppError('Error while the creating a new consultation.');
    // }
  }
}

export default CreateUserExamService;
