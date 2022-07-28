import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteConquestDTO } from "../dtos/IDeleteConquestDTO";
import { Conquest } from "../infra/knex/entities/Conquest";
import { IConquestsRepository } from "../repositories/IConquestsRepository";

@injectable()
class DeleteConquestService {
    constructor(
      @inject("ConquestsRepository")
      private ConquestsRepository: IConquestsRepository,
    ) {}
  
    public async execute({
      id,
    }: IDeleteConquestDTO): Promise<Conquest[]> {
  
      const conquest = await this.ConquestsRepository.delete({
          id,
      });
  
      return conquest;
    }
  }

export { DeleteConquestService };