import { uuid } from 'uuidv4';
import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ICreateConsultationDTO from '@modules/consultations/dtos/ICreateConsultationDTO';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';

class ConsultationsRepository implements IConsultationsRepository {
  private consultations: Consultation[] = [];

  public async create(
    consultationData: ICreateConsultationDTO,
  ): Promise<Consultation> {
    const consultation = new Consultation();

    Object.assign(
      consultation,
      {
        id: uuid(),
      },
      consultationData,
    );

    this.consultations.push(consultation);

    return consultation;
  }

  public async findAllConsultations(user_id: string): Promise<Consultation[]> {
    let { consultations } = this;

    consultations = this.consultations.filter(
      consultation => consultation.user_id === user_id,
    );

    return consultations;
  }
}

export default ConsultationsRepository;
