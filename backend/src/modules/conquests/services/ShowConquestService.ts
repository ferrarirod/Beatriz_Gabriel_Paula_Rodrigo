import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowConquestDTO } from "../dtos/IShowConquestDTO";
import { Conquest } from "../infra/knex/entities/Conquest";
import { IConquestsRepository } from "../repositories/IConquestsRepository";

@injectable()
class ShowConquestService {
    constructor(
      @inject("ConquestsRepository")
      private ConquestsRepository: IConquestsRepository,
    ) {}
  
    public async execute({
      id,
    }: IShowConquestDTO): Promise<Conquest[]> {
  
      const Task = await this.ConquestsRepository.delete({
          id,
      });
  
      return Task;
    }
  }

export {ShowConquestService };