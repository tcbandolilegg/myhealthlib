import Consultation from '../infra/typeorm/entities/Consultation';
import ICreateConsultationDTO from '../dtos/ICreateConsultationDTO';

export default interface IConsultationsRepository {
  create(data: ICreateConsultationDTO): Promise<Consultation>;
}
