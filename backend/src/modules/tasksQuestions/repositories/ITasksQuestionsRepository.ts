import { ICreateTasksQuestionsDTO } from "../dtos/ICreateTasksQuestionsDTO";
import { TaskQuestion } from "../infra/knex/entities/TaskQuestion";

interface ITasksQuestionsRepository {
    create(data: ICreateTasksQuestionsDTO):Promise<void>;
    deleteByTask(task_id: string):Promise<void>;
    findByTaskId(task_id:string):Promise<any[]>
}

export { ITasksQuestionsRepository };
