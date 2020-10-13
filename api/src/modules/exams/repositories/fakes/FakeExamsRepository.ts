import { uuid } from 'uuidv4';
import IExamsRepository from '@modules/exams/repositories/IExamsRepository';
import ICreateExamDTO from '@modules/exams/dtos/ICreateExamDTO';

import Exam from '@modules/exams/infra/typeorm/entities/Exam';

class ExamsRepository implements IExamsRepository {
  private exams: Exam[] = [];

  public async findById(id: string): Promise<Exam | undefined> {
    const exam = this.exams.find(itemExam => itemExam.id === id);

    return exam;
  }

  public async create(examData: ICreateExamDTO): Promise<Exam> {
    const exam = new Exam();

    Object.assign(exam, { id: uuid() }, examData);

    return exam;
  }

  public async save(exam: Exam): Promise<Exam> {
    this.exams.push(exam);
    return exam;
  }
}

export default ExamsRepository;
