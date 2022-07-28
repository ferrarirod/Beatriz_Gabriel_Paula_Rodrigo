import { CreateAnswersService } from "@modules/answers/services/CreateAnswersService";
import { SumScoreQuestionsService } from "@modules/questions/services/SumScoreQuestionsServices";
import { Request, Response } from "express";
import { container } from "tsyringe";

class AnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { answers, task_id } = request.body;

    const { id } = request.user;

    const createAnswersService = container.resolve(CreateAnswersService);

    const answer = await createAnswersService.execute({
      user_id: id,
      answers,
      task_id,
    });

    const sumScoreQuestionsService = container.resolve(SumScoreQuestionsService)

    const score = await sumScoreQuestionsService.execute({
        answers: answer
    })

    //  adicionar 
    return response.json(answer);
  }
}

export { AnswersController };
