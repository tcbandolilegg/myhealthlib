import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConsultationsDayAvailabilityService from '@modules/consultations/services/ListConsultationsDayAvailabilityService';

class ConsultationDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { day, month, year } = request.body;

    const listDayAvailability = container.resolve(
      ListConsultationsDayAvailabilityService,
    );

    const availability = listDayAvailability.execute({
      day,
      user_id,
      year,
      month,
    });

    return response.json(availability);
  }
}

export default ConsultationDayAvailabilityController;
