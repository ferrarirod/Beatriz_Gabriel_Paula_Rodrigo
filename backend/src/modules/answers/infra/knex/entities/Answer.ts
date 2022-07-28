import { ICreateAnswerDTO } from "@modules/answers/dtos/ICreateAnswerDTO";
import { v4 as uuid } from "uuid";

class Answer {
  id: string;

  question_id: string;

  task_id: string;

  option_id: string;

  user_id: string;

  created_at: Date;

  updated_at: Date;

  constructor({ option_id, question_id, task_id, user_id }: ICreateAnswerDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.option_id = option_id;
    this.question_id = question_id;
    this.task_id = task_id;
    this.user_id = user_id;
  }
}

export { Answer };
