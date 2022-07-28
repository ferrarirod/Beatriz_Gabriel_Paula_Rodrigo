import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteQuestionDTO } from "../dtos/IDeleteQuestionDTO";
import { Question } from "../infra/knex/entities/Question";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class DeleteQuestionService {
    constructor(
      @inject("QuestionsRepository")
      private QuestionsRepository: IQuestionsRepository,
    ) {}
  
    public async execute({
      id,
    }: IDeleteQuestionDTO): Promise<Question[]> {
  
      const question = await this.QuestionsRepository.delete({
          id,
      });
  
      return question;
    }
  }

export { DeleteQuestionService };