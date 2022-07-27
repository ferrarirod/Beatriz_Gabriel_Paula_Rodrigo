import { CreateManyTasksQuestionsService } from "@modules/tasksQuestions/services/CreateManyTasksQuestionsService";
import { ListTaskWithQuestionsAndOptionsService } from "@modules/tasksQuestions/services/ListTaskWithQuestionsAndOptionsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class TasksQuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { task_id, questions_id } = request.body;

    const createManyTasksQuestionsService = container.resolve(
      CreateManyTasksQuestionsService
    );

    const tasksQuestions = await createManyTasksQuestionsService.execute({
      task_id,
      questions_id,
    });

    return response.json(tasksQuestions);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;

    const listTaskQuestionsAndOptionsService = container.resolve(
      ListTaskWithQuestionsAndOptionsService
    );

    const tasksQuestions = await listTaskQuestionsAndOptionsService.execute({
      task_id,
    });

    return response.json(tasksQuestions);
  }
}

export { TasksQuestionsController };
