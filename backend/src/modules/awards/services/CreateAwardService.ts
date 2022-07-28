import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateAwardDTO } from "../dtos/ICreateAwardDTO";
import { Award } from "../infra/knex/entities/Award";
import { IAwardsRepository } from "../repositories/IAwardsRepository";

@injectable()
class CreateAwardService {
  constructor(
    @inject("AwardsRepository")
    private AwardsRepository: IAwardsRepository,
  ) { }

  public async execute({
    name,
    description, score
  }: ICreateAwardDTO): Promise<Award> {

    const conquest = await this.AwardsRepository.create({
      name,
      description, score
    });

    return conquest;
  }
}

export { CreateAwardService };