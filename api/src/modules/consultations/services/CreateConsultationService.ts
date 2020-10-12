import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Consultation from '../infra/typeorm/entities/Consultation';
import IConsultationsRepository from '../repositories/IConsultationsRepository';

interface IRequest {
  user_id: string;
  doctor: string;
  specialty: string;
  description: string;
  date: Date;
}

@injectable()
class CreateConsultationService {
  constructor(
    @inject('ConsultationsRepository')
    private consultationsRepository: IConsultationsRepository,
  ) {}

  public async execute({
    user_id,
    doctor,
    specialty,
    description,
    date,
  }: IRequest): Promise<Consultation> {
    try {
      const consultation = await this.consultationsRepository.create({
        user_id,
        doctor,
        specialty,
        description,
        date,
      });

      return consultation;
    } catch (error) {
      throw new AppError('Error while the creating a new consultation.');
    }
  }
}

export default CreateConsultationService;
