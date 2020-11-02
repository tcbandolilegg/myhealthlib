import Consultation from '../infra/typeorm/entities/Consultation';
import ICreateConsultationDTO from '../dtos/ICreateConsultationDTO';
import IFindAllContultaionsInMonthDTO from '../dtos/IFindAllContultaionsInMonthDTO';

export default interface IConsultationsRepository {
  create(data: ICreateConsultationDTO): Promise<Consultation>;
  findAllConsultations(user_id: string): Promise<Consultation[]>;
  findAllConsultationsInMonth(
    data: IFindAllContultaionsInMonthDTO,
  ): Promise<Consultation[]>;
}
