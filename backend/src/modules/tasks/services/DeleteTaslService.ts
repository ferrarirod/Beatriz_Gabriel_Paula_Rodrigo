import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteTaskDTO } from "../dtos/IDeleteTaskDTO";
import { Task } from "../infra/knex/entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class DeleteTaskService {
    constructor(
      @inject("TasksRepository")
      private TasksRepository: ITasksRepository,
    ) {}
  
    public async execute({
      id,
    }: IDeleteTaskDTO): Promise<Task[]> {
  
      const Task = await this.TasksRepository.delete({
          id,
      });
  
      return Task;
    }
  }

export { DeleteTaskService };