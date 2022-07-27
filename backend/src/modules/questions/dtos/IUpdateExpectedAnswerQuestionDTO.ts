import { Question } from "../infra/knex/entities/Question";

export interface IUpdateExpectedAnswerQuestionDTO{
    question: Question;
    expected_answer: string;
}