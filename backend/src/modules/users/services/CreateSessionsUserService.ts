import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const check = await this.hashProvider.compareHash(password, user.password);

    if (!check) {
      throw new AppError("Unauthorized", 401);
    }

    const token = sign({ id: user.id, type: user.type }, auth.secret);

    return {
      user,
      token,
    };
  }
}

export { CreateSessionUserService };
