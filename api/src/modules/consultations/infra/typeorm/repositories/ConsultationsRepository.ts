import { getRepository, Repository } from 'typeorm';
import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ICreateConsultationDTO from '@modules/consultations/dtos/ICreateConsultationDTO';

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
}

export default ConsultationsRepository;
