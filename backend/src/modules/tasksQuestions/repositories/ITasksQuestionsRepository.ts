import { ICreateManyTasksQuestionsDTO } from "../dtos/ICreateManyTasksQuestionsDTO";
import { ICreateTasksQuestionsDTO } from "../dtos/ICreateTasksQuestionsDTO";

interface ITasksQuestionsRepository {
    create(data: ICreateTasksQuestionsDTO):Promise<void>
}

export { ITasksQuestionsRepository };
