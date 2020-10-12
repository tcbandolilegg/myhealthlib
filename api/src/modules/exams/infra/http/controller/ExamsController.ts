import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserExamService from '@modules/exams/services/CreateUserExamService';

class ExamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserExam = container.resolve(CreateUserExamService);

    const exam = await createUserExam.execute({
      user_id: request.user.id,
      examFilename: request.file.filename,
      description: request.body,
    });

    return response.json(exam);
  }
}

export default ExamsController;
