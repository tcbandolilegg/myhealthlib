import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ConsultationsController from '../controllers/ConsultationsContoller';
import ConsultationDayAvailabilityController from '../controllers/ConsultationDayAvailabilityController';
import ConsultationMonthAvailabilityController from '../controllers/ConsultationMonthAvailabilityController';

const consultationsRouter = Router();
const consultationsContoller = new ConsultationsController();
const consultationDayAvailabilityController = new ConsultationDayAvailabilityController();
const consultationMonthAvailabilityController = new ConsultationMonthAvailabilityController();

consultationsRouter.use(ensureAuthenticated);

consultationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      doctor: Joi.string().required(),
      specialty: Joi.string().required(),
      description: Joi.string(),
      date: Joi.date(),
    },
  }),
  consultationsContoller.create,
);

consultationsRouter.get('/', consultationsContoller.index);

consultationsRouter.get(
  '/:user_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  consultationDayAvailabilityController.index,
);

consultationsRouter.get(
  '/:user_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  consultationMonthAvailabilityController.index,
);

export default consultationsRouter;
