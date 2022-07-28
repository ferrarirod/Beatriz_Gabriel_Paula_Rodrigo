import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Conquest } from "../infra/knex/entities/Conquest";
import { IConquestsRepository } from "../repositories/IConquestsRepository";

@injectable()
class IndexConquestService {
    constructor(
      @inject("ConquestsRepository")
      private ConquestsRepository: IConquestsRepository,
    ) {}
  
    public async execute(): Promise<Conquest[]> {
  
      const conquests = await this.ConquestsRepository.index();
  
      return conquests ;
    }
  }

export {IndexConquestService };