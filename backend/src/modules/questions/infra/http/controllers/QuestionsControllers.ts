import { CreateQuestionService } from "@modules/questions/services/CreateQuestionService";
import { UpdateQuestionService } from "@modules/questions/services/UpdateQuestionService";
import { DeleteQuestionService } from "@modules/questions/services/DeleteQuestionService";
import { ShowQuestionService } from "@modules/questions/services/ShowQuestionService";
import { IndexQuestionService } from "@modules/questions/services/IndexQuestionService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {title, task_id, description, score, status} = request.body;
    const createQuestionService = container.resolve(CreateQuestionService);

    const newQuestion = await createQuestionService.execute({
      title,
      task_id,
      description,
      score,
      status,
    });

    return response.json(newQuestion);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexQuestionService = container.resolve(IndexQuestionService);
    const questions = await indexQuestionService.execute();
    return response.json(questions);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const showQuestionService = container.resolve(ShowQuestionService);
    const selectedQuestion = await showQuestionService.execute({id});
    return response.json(selectedQuestion);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const {title, task_id, description, score, status, expected_answer, } = request.body;
    const {id} = request.params;
    const updateQuestionService = container.resolve(UpdateQuestionService);
    const updatedQuestion = await updateQuestionService.execute({
      id,
      title,
      task_id,
      description,
      score,
      status,
      expected_answer,
    });
    return response.json(updatedQuestion);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteQuestionService = container.resolve(DeleteQuestionService);
    const deletedQuestion = await deleteQuestionService.execute({id});
    return response.json(deletedQuestion);
  }
}

export { QuestionsController };
