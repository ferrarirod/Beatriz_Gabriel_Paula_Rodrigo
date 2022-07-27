import { CreateManyOptionsService } from "@modules/options/services/CreateManyOptionsService";
import { CreateQuestionService } from "@modules/questions/services/CreateQuestionService";
import { UpdateExpectedAnswerQuestionService } from "@modules/questions/services/UpdateExpectedAnswerQuestionService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class QuestionsOptionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, score, status, options } = request.body;

    const createQuestionService = container.resolve(CreateQuestionService);

    const question = await createQuestionService.execute({
      title,
      description,
      score,
      status,
    });

    const createManyOptionsService = container.resolve(
      CreateManyOptionsService
    );

    const createdOptions = await createManyOptionsService.execute({
      question_id: question.id,
      options,
    });

    const index = options.findIndex((op: any) => op.correct);


    const updateExpectedAnswerQuestionService = container.resolve(
      UpdateExpectedAnswerQuestionService
    );

    await updateExpectedAnswerQuestionService.execute({
      question,
      expected_answer: createdOptions[index].id,
    });

    question.expected_answer = createdOptions[index].id;
    question.options = createdOptions;

    return response.json(question);
  }
}

export { QuestionsOptionsController };
