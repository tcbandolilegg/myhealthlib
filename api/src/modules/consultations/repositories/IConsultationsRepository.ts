import Consultation from '../infra/typeorm/entities/Consultation';
import ICreateConsultationDTO from '../dtos/ICreateConsultationDTO';
import IFindAllContultaionsInMonthDTO from '../dtos/IFindAllContultaionsInMonthDTO';
import IFindAllContultaionsInDayDTO from '../dtos/IFindAllContultaionsInDayDTO';

export default interface IConsultationsRepository {
  create(data: ICreateConsultationDTO): Promise<Consultation>;
  findByDate(date: Date, user_id: string): Promise<Consultation | undefined>;
  findAllConsultations(user_id: string): Promise<Consultation[]>;
  findAllConsultationsInMonth(
    data: IFindAllContultaionsInMonthDTO,
  ): Promise<Consultation[]>;
  findAllConsultationsInDay(
    data: IFindAllContultaionsInDayDTO,
  ): Promise<Consultation[]>;
}
