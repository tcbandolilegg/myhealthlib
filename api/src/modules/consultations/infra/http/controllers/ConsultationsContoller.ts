import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateConsultationService from '@modules/consultations/services/CreateConsultationService';
import ListConsultationsService from '@modules/consultations/services/ListConsultationsService';

class ConsultationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { doctor, specialty, description, date } = request.body;

    const parsedDate = parseISO(date);

    const createConsultation = container.resolve(CreateConsultationService);

    const consultation = await createConsultation.execute({
      user_id,
      doctor,
      specialty,
      description,
      date: parsedDate,
    });

    return response.json(consultation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listConsultations = container.resolve(ListConsultationsService);

    const consultations = await listConsultations.execute({ user_id });

    return response.json(consultations);
  }
}

export default ConsultationsController;
