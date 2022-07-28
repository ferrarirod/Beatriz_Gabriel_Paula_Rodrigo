import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateConquestDTO } from "../dtos/IUpdateConquestDTO";
import { Conquest } from "../infra/knex/entities/Conquest";
import { IConquestsRepository } from "../repositories/IConquestsRepository";

@injectable()
class UpdateConquestService {
    constructor(
      @inject("ConquestsRepository")
      private ConquestsRepository: IConquestsRepository,
    ) {}
  
    public async execute({
      id,
      user_id,
      award_id,
    }: IUpdateConquestDTO): Promise<Conquest> {
  
      const conquest = await this.ConquestsRepository.update({
          id,
          user_id,
          award_id,
      });
  
      return conquest;
    }
  }

export { UpdateConquestService };