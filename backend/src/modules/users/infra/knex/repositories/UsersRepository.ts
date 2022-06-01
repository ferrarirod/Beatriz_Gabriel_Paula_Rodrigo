import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IFindByEmailOrCpf } from "@modules/users/dtos/IFindByEmailOrCpfDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "../entities/User";
import { connection } from "@shared/infra/knex";

class UsersRepository implements IUsersRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = connection<User>("users");
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.where({});

    return users;
  }

  public async findByEmailOrCpf({
    email,
    cpf,
  }: IFindByEmailOrCpf): Promise<User | null> {
    const user = await this.ormRepository
      .where({
        email,
      })
      .orWhere({
        cpf,
      })
      .limit(1);

    return user[0];
  }

  public async create({
    cpf,
    email,
    name,
    password,
    type,
  }: ICreateUserDTO): Promise<User> {
    const user = new User({ cpf, email, name, password, type });

    await this.ormRepository.insert(user);

    return user;
  }
}

export { UsersRepository };
