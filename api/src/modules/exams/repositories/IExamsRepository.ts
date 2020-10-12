import ICreateExamDTO from '../dtos/ICreateExamDTO';
import Exam from '../infra/typeorm/entities/Exam';

export default interface IUSersRepositories {
  findById(id: string): Promise<Exam | undefined>;
  create(data: ICreateExamDTO): Promise<Exam>;
  save(exam: Exam): Promise<Exam>;
}
