import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Task } from "../infra/knex/entities/Task";
import { ITasksRepository } from "../repositories/ITasksRepository";

@injectable()
class IndexTaskService {
    constructor(
      @inject("TasksRepository")
      private TasksRepository: ITasksRepository,
    ) {}
  
    public async execute(): Promise<Task[]> {
  
      const Tasks = await this.TasksRepository.index();
  
      return Tasks;
    }
  }

export {IndexTaskService };