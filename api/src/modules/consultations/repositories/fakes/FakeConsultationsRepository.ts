import { uuid } from 'uuidv4';
import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ICreateConsultationDTO from '@modules/consultations/dtos/ICreateConsultationDTO';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';

class ConsultationsRepository implements IConsultationsRepository {
  private consultations: Consultation[] = [];

  public async create({
    user_id,
    doctor,
    specialty,
    description,
    date,
  }: ICreateConsultationDTO): Promise<Consultation> {
    const consultation = new Consultation();

    Object.assign(consultation, {
      id: uuid(),
      user_id,
      doctor,
      specialty,
      description,
      date,
    });

    this.consultations.push(consultation);

    return consultation;
  }
}

export default ConsultationsRepository;
