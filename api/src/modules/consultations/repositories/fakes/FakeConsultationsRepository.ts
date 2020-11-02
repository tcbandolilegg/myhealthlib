import { uuid } from 'uuidv4';
import { getMonth, getYear } from 'date-fns';
import IConsultationsRepository from '@modules/consultations/repositories/IConsultationsRepository';
import ICreateConsultationDTO from '@modules/consultations/dtos/ICreateConsultationDTO';
import Consultation from '@modules/consultations/infra/typeorm/entities/Consultation';
import IFindAllContultaionsInMonthDTO from '@modules/consultations/dtos/IFindAllContultaionsInMonthDTO';

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

  public async findAllConsultationsInMonth({
    user_id,
    year,
    month,
  }: IFindAllContultaionsInMonthDTO): Promise<Consultation[]> {
    const consultations = this.consultations.filter(consultation => {
      return (
        consultation.user_id === user_id &&
        getMonth(consultation.date) + 1 === month &&
        getYear(consultation.date) === year
      );
    });

    return consultations;
  }
}

export default ConsultationsRepository;
