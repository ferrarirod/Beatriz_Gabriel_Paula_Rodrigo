import { Task } from "@modules/tasks/infra/knex/entities/Task";

export interface ICreateQuestionDTO{
    title: string;
    description :string;
    score:number;
    status: boolean;
    expected_answer?:number;
    
}