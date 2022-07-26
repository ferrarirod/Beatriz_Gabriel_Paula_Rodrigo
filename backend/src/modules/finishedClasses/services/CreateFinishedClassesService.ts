import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateFinishedClassesDTO } from "../dtos/ICreateFinishedClassesDTO";
import { IFinishedClassesRepository } from "../repositories/IFinishedClassesRepository";

@injectable()
class CreateFinishedClassesService {
  constructor(
    @inject("FinishedClassesRepository")
    private finishedClassesRepository: IFinishedClassesRepository
  ) {}

  public async execute({ class_id, user_id }: ICreateFinishedClassesDTO) {
    const existFinisehdClassByUser =
      await this.finishedClassesRepository.findOneByUserAndClass({
        user_id,
        class_id,
      });

    if (existFinisehdClassByUser) {
      throw new AppError("Class already finished.", 400);
    }


  }
}


export { CreateFinishedClassesService }