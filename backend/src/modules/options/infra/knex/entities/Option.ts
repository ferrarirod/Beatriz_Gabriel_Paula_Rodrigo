import { ICreateOptionDTO } from "@modules/options/dtos/ICreateOptionDTO";
import { v4 as uuid } from "uuid";
class Option {
  id: string;

  name: string;

  description: string;

  created_at?: Date;

  updated_at?: Date;

  constructor({ name, description }: ICreateOptionDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.name = name;
    this.description = description;
  }
}

export { Option };
