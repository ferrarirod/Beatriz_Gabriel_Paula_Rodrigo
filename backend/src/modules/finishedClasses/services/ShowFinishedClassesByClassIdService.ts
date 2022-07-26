import { inject, injectable } from "tsyringe";
import { IFinishedClassesRepository } from "../repositories/IFinishedClassesRepository";

interface IRequest {
  class_id: string;
}

@injectable()
class ShowFinishedClassesByClassIdService {
  constructor(
    @inject("FinishedClassesRepository")
    private finishedClassesRepository: IFinishedClassesRepository
  ) {}

  public async execute({ class_id }: IRequest) {
    const finishedClass = await this.finishedClassesRepository.finByClassId(
      class_id
    );

    return finishedClass;
  }
}


export { ShowFinishedClassesByClassIdService}