import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ExamsController from '../controller/ExamsController';

const examsRouter = Router();
const examsController = new ExamsController();

const upload = multer(uploadConfig);

examsRouter.use(ensureAuthenticated);

examsRouter.post('/', upload.single('exam'), examsController.create);

export default examsRouter;
