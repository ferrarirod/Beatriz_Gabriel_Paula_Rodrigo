import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateQuestionDTO } from "../dtos/IUpdateQuestionDTO";
import { Question } from "../infra/knex/entities/Question";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class UpdateQuestionService {
    constructor(
      @inject("QuestionsRepository")
      private QuestionsRepository: IQuestionsRepository,
    ) {}
  
    public async execute({
      id,
      title,
      task_id,
      description,
      score,
      status,
      expected_answer,
    }: IUpdateQuestionDTO): Promise<Question> {
  
      const question = await this.QuestionsRepository.update({
          id,
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

export { UpdateQuestionService };