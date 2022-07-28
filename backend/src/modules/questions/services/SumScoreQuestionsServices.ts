import { inject, injectable } from "tsyringe";
import { IQuestionsRepository } from "../repositories/IQuestionsRepository";

interface IRequest {
  answers: {
    question_id: string;
    option_id: string;
  }[];
}

@injectable()
class SumScoreQuestionsService {
  constructor(
    @inject("QuestionsRepository")
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ answers }: IRequest) {
    const score = await this.questionsRepository.sumScoreQuestions({
      answers,
    });

    return score;
  }
}

export { SumScoreQuestionsService };
