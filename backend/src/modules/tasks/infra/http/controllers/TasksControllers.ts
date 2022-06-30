import { CreateTaskService } from "@modules/tasks/services/CreateTaskService";
import { UpdateTaskService } from "@modules/tasks/services/UpdateTaskService";
import { DeleteTaskService } from "@modules/tasks/services/DeleteTaslService";
import { ShowTaskService } from "@modules/tasks/services/ShowTaskService";
import { IndexTaskService } from "@modules/tasks/services/IndexTaskService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, class_id, description,score, status } = request.body;
    const createTaskService = container.resolve(CreateTaskService);

    const newTask = await createTaskService.execute({
        title,
        class_id,
        description,
        score,
        status
    });

    return response.json(newTask);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexTaskService = container.resolve(IndexTaskService);
    const tasks = await indexTaskService.execute();
    return response.json(tasks);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const showTaskService = container.resolve(ShowTaskService);
    const selectedTask = await showTaskService.execute({id});
    return response.json(selectedTask);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { title, class_id, description,score, status } = request.body;
    const {id} = request.params;
    const updateTaskService = container.resolve(UpdateTaskService);
    const updatedTask = await updateTaskService.execute({
      id,
      title,
      class_id,
      description,
      score,
      status
    });
    return response.json(updatedTask);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteTaskService = container.resolve(DeleteTaskService);
    const deletedTask = await deleteTaskService.execute({id});
    return response.json(deletedTask);
  }
}

export { TasksController };
