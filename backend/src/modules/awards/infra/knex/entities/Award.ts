import { ICreateAwardDTO } from "@modules/awards/dtos/ICreateAwardDTO";
import { v4 as uuid } from "uuid";
class Award {
  id: string;

  name: string;

  description: string;

  score: number;

  created_at: Date;

  updated_at: Date;

  constructor({ name, description, score }: ICreateAwardDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.name = name;
    this.description = description;
    this.score = score;
  }
}

export { Award };
