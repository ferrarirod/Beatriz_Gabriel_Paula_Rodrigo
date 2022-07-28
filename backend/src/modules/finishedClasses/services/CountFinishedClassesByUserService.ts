import { inject, injectable } from "tsyringe";
import { IFinishedClassesRepository } from "../repositories/IFinishedClassesRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class CountFinishedClassesByUserService {
  constructor(
    @inject("FinishedClassesRepository")
    private finishedClassesRepository: IFinishedClassesRepository
  ) {}

  public async execute({ user_id }: IRequest) {
    const total = await this.finishedClassesRepository.countByUser(user_id);
    return total;
  }
}

export { CountFinishedClassesByUserService };
