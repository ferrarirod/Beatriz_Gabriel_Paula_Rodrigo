import { ICreateQuestionOptionDTO } from "@modules/options/dtos/ICreateOptionDTO";
import { v4 as uuid } from "uuid";
class QuestionOption {
  id: string;

  question_id?: string;

  option_id: string;

  created_at: Date;

  updated_at: Date;

  constructor({ question_id, option_id}: ICreateQuestionOptionDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.question_id = question_id;
    this.option_id = option_id;
  }
}

export { QuestionOption };
