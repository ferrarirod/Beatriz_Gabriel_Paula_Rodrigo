import { ICreateModuleDTO } from "@modules/modules/dtos/ICreateModuleDTO";
import { v4 as uuid } from "uuid";
class Module {
  id: string;

  name: string;

  description: string;

  created_at: Date;

  updated_at: Date;

  constructor({ name, description }: ICreateModuleDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.name = name;
    this.description = description;
  }
}

export { Module };
