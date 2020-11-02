import { getRepository, Repository, Raw } from 'typeorm';
import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ICreateConsultationDTO from '@modules/consultations/dtos/ICreateConsultationDTO';

import IFindAllContultaionsInMonthDTO from '@modules/consultations/dtos/IFindAllContultaionsInMonthDTO';
import Consultation from '../entities/Consultation';

class ConsultationsRepository implements IConsultationsRepository {
  private ormRepository: Repository<Consultation>;

  constructor() {
    this.ormRepository = getRepository(Consultation);
  }

  public async create({
    user_id,
    doctor,
    specialty,
    description,
    date,
  }: ICreateConsultationDTO): Promise<Consultation> {
    const consultation = this.ormRepository.create({
      user_id,
      doctor,
      specialty,
      description,
      date,
    });

    await this.ormRepository.save(consultation);

    return consultation;
  }

  public async findAllConsultations(user_id: string): Promise<Consultation[]> {
    const consultations = this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return consultations;
  }

  public async findAllConsultationsInMonth({
    user_id,
    year,
    month,
  }: IFindAllContultaionsInMonthDTO): Promise<Consultation[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const consultations = this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return consultations;
  }
}

export default ConsultationsRepository;
