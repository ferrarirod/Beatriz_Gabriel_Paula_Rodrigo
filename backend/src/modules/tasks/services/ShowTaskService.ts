import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowTaskDTO } from "../dtos/IShowTaskDTO";
import { Task } from "../infra/knex/entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class ShowTaskService {
    constructor(
      @inject("TasksRepository")
      private TasksRepository: ITasksRepository,
    ) {}
  
    public async execute({
      id,
    }: IShowTaskDTO): Promise<Task[]> {
  
      const Task = await this.TasksRepository.delete({
          id,
      });
  
      return Task;
    }
  }

export {ShowTaskService };