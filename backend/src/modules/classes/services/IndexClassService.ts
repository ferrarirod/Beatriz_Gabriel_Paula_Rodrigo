import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Class } from "../infra/knex/entities/Class";
import { IClassesRepository } from "../repositories/IClassesRepository";

@injectable()
class IndexClassService {
    constructor(
      @inject("ClassesRepository")
      private ClassesRepository: IClassesRepository,
    ) {}
  
    public async execute(): Promise<Class[]> {
  
      const classes = await this.ClassesRepository.index();
  
      return classes;
    }
  }

export {IndexClassService };