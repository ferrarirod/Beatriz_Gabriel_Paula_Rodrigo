import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindByEmailOrCpf } from "../dtos/IFindByEmailOrCpfDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/knex/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmailOrCpf(data: IFindByEmailOrCpf): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  update(data: IUpdateUserDTO): Promise<void>;
}
