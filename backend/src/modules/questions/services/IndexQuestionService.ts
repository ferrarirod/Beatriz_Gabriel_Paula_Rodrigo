import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Question } from "../infra/knex/entities/Question";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class IndexQuestionService {
    constructor(
      @inject("QuestionsRepository")
      private QuestionsRepository: IQuestionsRepository,
    ) {}
  
    public async execute(): Promise<Question[]> {
  
      const questions = await this.QuestionsRepository.index();
  
      return questions;
    }
  }

export {IndexQuestionService };