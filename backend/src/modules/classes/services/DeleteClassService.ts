import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteClassDTO } from "../dtos/IDeleteClassDTO";
import { Class } from "../infra/knex/entities/Class";
import { IClassesRepository } from "../repositories/IClassesRepository";

@injectable()
class DeleteClassService {
    constructor(
      @inject("ClassesRepository")
      private ClassesRepository: IClassesRepository,
    ) {}
  
    public async execute({
      id,
    }: IDeleteClassDTO): Promise<Class[]> {
  
      const Class = await this.ClassesRepository.delete({
          id,
      });
  
      return Class;
    }
  }

export { DeleteClassService };