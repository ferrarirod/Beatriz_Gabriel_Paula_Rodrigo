import { ICreateQuestionDTO } from "@modules/questions/dtos/ICreateQuestionDTO";
import { IUpdateQuestionDTO } from "@modules/questions/dtos/IUpdateQuestionDTO";
import { IDeleteQuestionDTO } from "@modules/questions/dtos/IDeleteQuestionDTO";
import { IShowQuestionDTO } from "@modules/questions/dtos/IShowQuestionDTO";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { Question } from "../entities/Question";
import { connection } from "@shared/infra/knex";
import { CreateQuestionService } from "@modules/questions/services/CreateQuestionService";
import { join } from "path";
import { Option } from "@modules/options/infra/knex/entities/Option";
import { IUpdateExpectedAnswerQuestionDTO } from "@modules/questions/dtos/IUpdateExpectedAnswerQuestionDTO";

class QuestionsRepository implements IQuestionsRepository {
  public async updateExepectedAnswer({
    question,
    expected_answer,
  }: IUpdateExpectedAnswerQuestionDTO): Promise<Question> {
    await connection<Question>("questions")
      .where({ id: question.id })
      .update({ ...question, expected_answer });

    return { ...question, expected_answer };
  }
  public async create({
    title,
    description,
    score,
    status,
    expected_answer,
  }: ICreateQuestionDTO): Promise<Question> {
    const newQuestion = new Question({
      title,
      description,
      score,
      status,
      expected_answer,
    });

    await connection<Question>("questions").insert(newQuestion);

    return newQuestion;
  }
  public async update({
    id,
    title,
    description,
    score,
    status,
    expected_answer,
  }: IUpdateQuestionDTO): Promise<Question> {
    const updatedQuestion = new Question({
      title,
      description,
      score,
      status,
      expected_answer,
    });
    await connection<Question>("questions")
      .where({ id })
      .update({ title, description, score, status, expected_answer });

    updatedQuestion.id = id;
    return updatedQuestion;
  }
  public async show({ id }: IShowQuestionDTO): Promise<Question[]> {
    const selectedQuestion = await connection<Question>("questions")
      .where({ id })
      .select();

    return selectedQuestion;
  }
  public async delete({ id }: IDeleteQuestionDTO): Promise<Question[]> {
    const deletedQuestion = await connection<Question>("questions").where(
      "id",
      "=",
      id
    );

    await connection<Question>("questions").where("id", "=", id).del();

    return deletedQuestion;
  }

  public async index(): Promise<Question[]> {
    const result = await connection<Question>("questions").select();

    return result;
  }
}

export { QuestionsRepository };
