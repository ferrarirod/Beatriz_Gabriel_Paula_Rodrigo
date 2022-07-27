import { ICreateQuestionDTO } from "@modules/questions/dtos/ICreateQuestionDTO";
import { Option} from "@modules/options/infra/knex/entities/Option";

import { v4 as uuid } from "uuid";

class Question {
  id: string;

  title: string;

  description:string;

  score: number;

  status: boolean;

  expected_answer?: number;

  options?: Option[] | any;

  created_at: Date;

  updated_at: Date;

  constructor({ title, description, score, status, expected_answer}: ICreateQuestionDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.title = title;
    this.description = description;
    this.score = score;
    this.status = status;
    this.expected_answer = expected_answer
  }
}

export { Question };
