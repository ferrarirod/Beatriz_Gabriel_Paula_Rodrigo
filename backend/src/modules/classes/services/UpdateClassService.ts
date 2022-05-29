import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateClassDTO } from "../dtos/IUpdateClassDTO";
import { Class } from "../infra/knex/entities/Class";
import { IClassesRepository } from "../repositories/IClassesRepository";

@injectable()
class UpdateClassService {
    constructor(
      @inject("ClassesRepository")
      private ClassesRepository: IClassesRepository,
    ) {}
  
    public async execute({
      id,
      title,
      module,
      content,
      link
    }: IUpdateClassDTO): Promise<Class> {
  
      const Class = await this.ClassesRepository.update({
          id,
          title,
          module,
          content,
          link
      });
  
      return Class;
    }
  }

export { UpdateClassService };