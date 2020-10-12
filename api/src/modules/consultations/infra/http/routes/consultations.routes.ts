import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ConsultationsController from '../controllers/ConsultationsContoller';

const consultationsRouter = Router();
const consultationsContoller = new ConsultationsController();

consultationsRouter.use(ensureAuthenticated);

consultationsRouter.post('/', consultationsContoller.create);

// consultationsRouter.get('/', async (request, response) => {
//   const consultations = await consultationsRepository.find();

//   return response.json(consultations);
// });
export default consultationsRouter;
