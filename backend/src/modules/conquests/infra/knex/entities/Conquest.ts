import { ICreateConquestDTO } from "@modules/conquests/dtos/ICreateConquestDTO";
import { v4 as uuid } from "uuid";
import { User } from "@modules/users/infra/knex/entities/User";
import { Award } from "@modules/awards/infra/knex/entities/Award";

class Conquest {
  id: string;

  user_id: string | User;

  award_id: string | Award

  date: Date;

  created_at: Date;

  updated_at: Date;

  constructor({ user_id, award_id}: ICreateConquestDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.user_id = user_id;
    this.award_id = award_id;
    this.date = new Date();
  }
}

export { Conquest };
