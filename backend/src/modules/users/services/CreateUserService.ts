import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/knex/entities/User";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    cpf,
    email,
    name,
    password,
    type,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmailOrCpf({
      cpf,
      email,
    });

    if (userAlreadyExist) {
      throw new AppError("User already exist.", 400);
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      cpf,
      email,
      name,
      password: hashPassword,
      type,
    });

    return user;
  }
}

export { CreateUserService };
