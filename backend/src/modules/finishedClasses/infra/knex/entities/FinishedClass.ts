import { ICreateFinishedClassesDTO } from "@modules/finishedClasses/dtos/ICreateFinishedClassesDTO";
import { v4 as uuid } from "uuid";

class FinisedClass {
  id: string;

  user_id: string;

  class_id: string;

  created_at: Date;

  updated_at: Date;

  constructor({ user_id, class_id }: ICreateFinishedClassesDTO) {
    this.id = uuid();
    this.created_at = new Date();
    this.updated_at = new Date();
    this.user_id = user_id;
    this.class_id = class_id;
  }
}

export { FinisedClass };
