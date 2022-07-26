
import { Option } from './optionType';
import { Task } from './taskType';

export interface Question {
    id:string;
    title:string;
    task_id: string |  Task;
    options?: Option[];
    description:string,
    score:number;
    status?:boolean,
}