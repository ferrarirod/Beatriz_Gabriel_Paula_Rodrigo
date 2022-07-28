import { inject, injectable } from "tsyringe";
import { IUpdateExpectedAnswerQuestionDTO } from "../dtos/IUpdateExpectedAnswerQuestionDTO";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

@injectable()
class UpdateExpectedAnswerQuestionService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    question,
    expected_answer,
  }: IUpdateExpectedAnswerQuestionDTO) {
    await this.questionsRepository.updateExepectedAnswer({
      question,
      expected_answer,
    });
  }
}

export { UpdateExpectedAnswerQuestionService };
