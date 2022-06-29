
import { Class } from './classType';

export interface Task {
    id:string;
    title:string;
    class_id: Class,
    description:string,
    status:boolean,
}