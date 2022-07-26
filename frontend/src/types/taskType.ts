
import { Class } from './classType';
import { Question } from './questionType';

export interface Task {
    id:string;
    title:string;
    class_id: Class,
    description:string,
    score:number;
    status:boolean,
    questions?: Question[]
}