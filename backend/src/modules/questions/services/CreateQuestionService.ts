import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateQuestionDTO } from "../dtos/ICreateQuestionDTO";
import { Question } from "../infra/knex/entities/Question";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class CreateQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private QuestionsRepository: IQuestionsRepository,
  ) {}

  public async execute({
    title,
    task_id,
    description,
    score,
    status,
    expected_answer,
  }: ICreateQuestionDTO): Promise<Question> {

    const question = await this.QuestionsRepository.create({
      title,
    task_id,
    description,
    score,
    status,
    expected_answer,
    });

    return question;
  }
}

export { CreateQuestionService };