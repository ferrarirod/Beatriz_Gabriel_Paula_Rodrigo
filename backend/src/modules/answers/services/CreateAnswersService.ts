import { inject, injectable } from "tsyringe";
import { IAnswersRepository } from "../repositories/IAnswersRepository";

interface IRequest {
  answers: object;
  task_id: string;
  user_id: string;
}

@injectable()
class CreateAnswersService {
  constructor(
    @inject("AnswersRepository")
    private answersRepository: IAnswersRepository
  ) {}

  public async execute({ answers, task_id, user_id }: IRequest) {
    const createdAnswers = []
    for (var [question, option] of Object.entries(answers)) {
      let answer = await this.answersRepository.create({
        option_id: option,
        question_id: question,
        task_id,
        user_id,
      });
      createdAnswers.push(answer)
    }

    return createdAnswers;
  }
}

export { CreateAnswersService };
