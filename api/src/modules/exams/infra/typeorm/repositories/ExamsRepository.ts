import { getRepository, Repository } from 'typeorm';
import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import ICreateExamDTO from '@modules/exams/dtos/ICreateExamDTO';

import Exam from '../entities/Exam';

class UsersRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = getRepository(Exam);
  }

  public async findById(id: string): Promise<Exam | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(examData: ICreateExamDTO): Promise<Exam> {
    const user = this.ormRepository.create(examData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Exam): Promise<Exam> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
