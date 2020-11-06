import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConsultationsMonthAvailabilityService from '@modules/consultations/services/ListConsultationsMonthAvailabilityService';

class ConsultationMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { month, year } = request.body;

    const listmonthAvailability = container.resolve(
      ListConsultationsMonthAvailabilityService,
    );

    const availability = listmonthAvailability.execute({
      month,
      user_id,
      year,
    });

    return response.json(availability);
  }
}

export default ConsultationMonthAvailabilityController;
