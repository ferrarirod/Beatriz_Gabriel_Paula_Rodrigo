import { Task } from "@modules/tasks/infra/knex/entities/Task";

export interface ICreateQuestionDTO{
    title: string;
    task_id: string | Task;
    description :string;
    score:number;
    status: boolean;
    expected_answer?:number;
    
}