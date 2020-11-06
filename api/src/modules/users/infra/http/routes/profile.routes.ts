import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      cpf: Joi.string(),
      birth: Joi.string(),
      address: Joi.string(),
      address_two: Joi.string(),
      city: Joi.string(),
      uf: Joi.string(),
      password: Joi.string(),
      old_password: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
