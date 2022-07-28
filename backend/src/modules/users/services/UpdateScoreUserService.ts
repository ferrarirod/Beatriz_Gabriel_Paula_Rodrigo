import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  addScore: number;
  user_id: string;
}

@injectable()
class UpdateScoreUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, addScore }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const userUpdated = await this.usersRepository.updateScore(user, addScore);

    return userUpdated;
  }
}

export { UpdateScoreUserService };
