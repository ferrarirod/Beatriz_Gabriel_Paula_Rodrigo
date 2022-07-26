import { inject, injectable } from "tsyringe";
import { IFinishedClassesRepository } from "../repositories/IFinishedClassesRepository";

interface IRequest {
  class_id: string;
  user_id: string;
}

@injectable()
class ShowFinishedClassesByClassIdService {
  constructor(
    @inject("FinishedClassesRepository")
    private finishedClassesRepository: IFinishedClassesRepository
  ) {}

  public async execute({ class_id, user_id }: IRequest) {
    const finishedClass =
      await this.finishedClassesRepository.findOneByUserAndClass({
        class_id,
        user_id,
      });

    return finishedClass;
  }
}

export { ShowFinishedClassesByClassIdService };
