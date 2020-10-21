import { getRepository, Repository } from 'typeorm';
import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import ICreateExamDTO from '@modules/exams/dtos/ICreateExamDTO';

import Exam from '../entities/Exam';

class ExamsRepository implements IExamsRepository {
  private ormRepository: Repository<Exam>;

  constructor() {
    this.ormRepository = getRepository(Exam);
  }

  public async findById(id: string): Promise<Exam | undefined> {
    const exam = await this.ormRepository.findOne(id);

    return exam;
  }

  public async create(examData: ICreateExamDTO): Promise<Exam> {
    const exam = this.ormRepository.create(examData);

    await this.ormRepository.save(exam);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    return this.ormRepository.save(exam);
  }
}

export default ExamsRepository;
