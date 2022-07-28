import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowQuestionDTO } from "../dtos/IShowQuestionDTO";
import { Question } from "../infra/knex/entities/Question";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class ShowQuestionService {
    constructor(
      @inject("QuestionsRepository")
      private QuestionsRepository: IQuestionsRepository,
    ) {}
  
    public async execute({
      id,
    }: IShowQuestionDTO): Promise<Question[]> {
  
      const question = await this.QuestionsRepository.show({
          id,
      });
  
      return question;
    }
  }

export {ShowQuestionService };