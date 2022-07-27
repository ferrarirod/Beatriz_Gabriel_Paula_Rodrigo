import { ICreateQuestionDTO } from "@modules/questions/dtos/ICreateQuestionDTO";
import { IUpdateQuestionDTO } from "@modules/questions/dtos/IUpdateQuestionDTO";
import { IDeleteQuestionDTO } from "@modules/questions/dtos/IDeleteQuestionDTO";
import { IShowQuestionDTO } from "@modules/questions/dtos/IShowQuestionDTO";


import { Question } from "../infra/knex/entities/Question";
import { IUpdateExpectedAnswerQuestionDTO } from "../dtos/IUpdateExpectedAnswerQuestionDTO";

export interface IQuestionsRepository {
  create(data: ICreateQuestionDTO ): Promise<Question>;
  update(data: IUpdateQuestionDTO) : Promise<Question>;
  delete(data: IDeleteQuestionDTO) : Promise<Question[]>;
  show(data: IShowQuestionDTO) : Promise<Question[]>;
  index() : Promise<Question[]>;
  updateExepectedAnswer(data: IUpdateExpectedAnswerQuestionDTO):Promise<Question>;
}
