import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowClassDTO } from "../dtos/IShowClassDTO";
import { Class } from "../infra/knex/entities/Class";
import { IClassesRepository } from "../repositories/IClassesRepository";

@injectable()
class ShowClassService {
    constructor(
      @inject("ClassesRepository")
      private ClassesRepository: IClassesRepository,
    ) {}
  
    public async execute({
      id,
    }: IShowClassDTO): Promise<Class[]> {
  
      const Class = await this.ClassesRepository.show({
          id,
      });
  
      return Class;
    }
  }

export {ShowClassService };