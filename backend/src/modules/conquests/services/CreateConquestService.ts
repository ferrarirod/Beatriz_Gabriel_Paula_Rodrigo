import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateConquestDTO } from "../dtos/ICreateConquestDTO";
import { Conquest } from "../infra/knex/entities/Conquest";
import { IConquestsRepository } from "../repositories/IConquestsRepository";

@injectable()
class CreateConquestService {
  constructor(
    @inject("ConquestsRepository")
    private ConquestsRepository: IConquestsRepository,
  ) {}

  public async execute({
    user_id,
    award_id
  }: ICreateConquestDTO): Promise<Conquest> {

    const conquest = await this.ConquestsRepository.create({
    user_id,
    award_id
    });

    return conquest;
  }
}

export { CreateConquestService };