import { ICreateClassDTO } from "@modules/classes/dtos/ICreateClassDTO";
import { IUpdateClassDTO } from "@modules/classes/dtos/IUpdateClassDTO";
import { IDeleteClassDTO } from "@modules/classes/dtos/IDeleteClassDTO";
import { IShowClassDTO } from "@modules/classes/dtos/IShowClassDTO";


import { Class } from "../infra/knex/entities/Class";

export interface IClassesRepository {
  create(data: ICreateClassDTO ): Promise<Class>;
  update(data: IUpdateClassDTO) : Promise<Class>;
  delete(data: IDeleteClassDTO) : Promise<Class[]>;
  show(data: IShowClassDTO) : Promise<Class[]>;
  index() : Promise<Class[]>;
}
