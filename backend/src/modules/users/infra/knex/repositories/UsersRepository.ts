import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IFindByEmailOrCpf } from "@modules/users/dtos/IFindByEmailOrCpfDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "../entities/User";
import { connection } from "@shared/infra/knex";

class UsersRepository implements IUsersRepository {
  public async findAll(): Promise<User[]> {
    const users = await connection<User>("users").select();

    return users;
  }

  public async findByEmailOrCpf({
    email,
    cpf,
  }: IFindByEmailOrCpf): Promise<User | undefined> {
    const user = connection<User>("users")
      .where({
        email,
      })
      .orWhere({
        cpf,
      })
      .first();

    return user;
  }

  public async create({
    cpf,
    email,
    name,
    password,
    type,
  }: ICreateUserDTO): Promise<void> {
    await connection<User>("users").insert({
      cpf,
      email,
      name,
      password,
      type,
    });
  }
}

export { UsersRepository };
