import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "@modules/tasks/dtos/IUpdateTaskDTO";
import { IDeleteTaskDTO } from "@modules/tasks/dtos/IDeleteTaskDTO";
import { IShowTaskDTO } from "@modules/tasks/dtos/IShowTaskDTO";


import { Task } from "../infra/knex/entities/Task";

export interface ITasksRepository {
  create(data: ICreateTaskDTO ): Promise<Task>;
  update(data: IUpdateTaskDTO) : Promise<Task>;
  delete(data: IDeleteTaskDTO) : Promise<Task[]>;
  show(data: IShowTaskDTO) : Promise<Task[]>;
  index() : Promise<Task[]>;
}
