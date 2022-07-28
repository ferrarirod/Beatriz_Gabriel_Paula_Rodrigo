import { ICreateAnswerDTO } from "@modules/answers/dtos/ICreateAnswerDTO";
import { IAnswersRepository } from "@modules/answers/repositories/IAnswersRepository";
import { connection } from "@shared/infra/knex";
import { Answer } from "../entities/Answer";

class AnswersRepository implements IAnswersRepository {
  public async create(data: ICreateAnswerDTO): Promise<Answer> {
    const answer = new Answer(data);

    await connection<Answer>("answers").insert(answer);

    return answer;
  }
}

export { AnswersRepository };
