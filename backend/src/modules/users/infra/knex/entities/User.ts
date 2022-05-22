import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { v4 as uuid } from "uuid";
class User {
  id: string;

  name: string;

  email: string;

  cpf: string;

  score: number;

  type: number;

  password: string;

  created_at: Date;

  updated_at: Date;

  constructor({ cpf, email, name, password, type }: ICreateUserDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

export { User };
