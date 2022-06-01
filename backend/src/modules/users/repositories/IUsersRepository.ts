import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindByEmailOrCpf } from "../dtos/IFindByEmailOrCpfDTO";
import { User } from "../infra/knex/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmailOrCpf(data: IFindByEmailOrCpf): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}
