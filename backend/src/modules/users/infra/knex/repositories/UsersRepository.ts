import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IFindByEmailOrCpf } from "@modules/users/dtos/IFindByEmailOrCpfDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "../entities/User";
import { connection } from "@shared/infra/knex";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUpdateUserScoreDTO } from "@modules/users/dtos/IUpdateUserScoreDTO";
import { Award } from "@modules/awards/infra/knex/entities/Award";
import { CreateConquestService } from "@modules/conquests/services/CreateConquestService";
import { container } from "tsyringe";

class UsersRepository implements IUsersRepository {
  public async delete(id: string): Promise<void> {
    await connection<User>("users")
      .where({
        id,
      })
      .first()
      .delete();
  }

  public async findById(id: string): Promise<User | undefined> {
    return await connection<User>("users")
      .where({
        id,
      })
      .first();
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = connection<User>("users")
      .where({
        email,
      })
      .first();

    return user;
  }

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
      score: 0,
    });
  }

  public async updateScore(user: User, addScore: number): Promise<User> {
    await connection<User>("users")
      .where({
        id: user.id,
      })
      .update({
        score: user.score + addScore,
      });

    return {
      ...user,
      score: user.score + addScore,
    };
  }
}

export { UsersRepository };
