import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { Class} from "@modules/classes/infra/knex/entities/Class";
import { Question } from  "@modules/questions/infra/knex/entities/Question";
import { v4 as uuid } from "uuid";

class Task {
  id: string;

  title: string;

  class_id: string | Class;

  questions?: Question[]

  description:string;

  score: number;

  status: boolean;

  created_at: Date;

  updated_at: Date;

  constructor({ title, class_id, description, score, status}: ICreateTaskDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.title = title;
    this.class_id = class_id;
    this.description = description;
    this.score = score;
    this.status = status;
  }
}

export { Task };
