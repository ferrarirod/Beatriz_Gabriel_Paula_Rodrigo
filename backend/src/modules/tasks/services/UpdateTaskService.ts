import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateTaskDTO } from "../dtos/IUpdateTaskDTO";
import { Task } from "../infra/knex/entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class UpdateTaskService {
    constructor(
      @inject("TasksRepository")
      private TasksRepository: ITasksRepository,
    ) {}
  
    public async execute({
      id,
      title,
      class_id,
      description,
      status
    }: IUpdateTaskDTO): Promise<Task> {
  
      const Task = await this.TasksRepository.update({
          id,
          title,
          class_id,
          description,
          status
      });
  
      return Task;
    }
  }

export { UpdateTaskService };