import { Router } from 'express';
import consultationsRouter from '@modules/consultations/infra/http/routes/consultations.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import examsRouter from '@modules/exams/infra/http/routes/exams.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/consultations', consultationsRouter);
routes.use('/exams', examsRouter);

export default routes;
