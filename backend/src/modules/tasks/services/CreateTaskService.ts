import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateTaskDTO } from "../dtos/ICreateTaskDTO";
import { Task } from "../infra/knex/entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class CreateTaskService {
  constructor(
    @inject("TasksRepository")
    private TasksRepository: ITasksRepository,
  ) {}

  public async execute({
    title,
    class_id,
    description,
    status
  }: ICreateTaskDTO): Promise<Task> {

    const Task = await this.TasksRepository.create({
      title,
      class_id,
      description,
      status
    });

    return Task;
  }
}

export { CreateTaskService };