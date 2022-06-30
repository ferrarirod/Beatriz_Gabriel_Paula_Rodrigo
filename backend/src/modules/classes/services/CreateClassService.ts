import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { Class } from "../infra/knex/entities/Class";
import { IClassesRepository } from "../repositories/IClassesRepository";

@injectable()
class CreateClassService {
  constructor(
    @inject("ClassesRepository")
    private ClassesRepository: IClassesRepository,
  ) {}

  public async execute({
    title,
    module,
    content,
    link,
    score
  }: ICreateClassDTO): Promise<Class> {

    console.log('module id inside create class service', module)
    const Class = await this.ClassesRepository.create({
        title,
        module,
        content,
        link,
        score
    });

    return Class;
  }
}

export { CreateClassService };