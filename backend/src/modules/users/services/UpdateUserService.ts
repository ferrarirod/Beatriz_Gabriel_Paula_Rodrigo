import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRpository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    cpf,
    email,
    name,
    password,
    type,
  }: IUpdateUserDTO) {
    const user = await this.usersRpository.findById(id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }
    const hashPassword = await this.hashProvider.generateHash(password);

   
    await this.usersRpository.update({
      id,
      cpf,
      email,
      name,
      password: hashPassword,
      type,
    });
  }
}

export { UpdateUserService };
