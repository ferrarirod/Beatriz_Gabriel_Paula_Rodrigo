import { ICreateConquestDTO } from "@modules/conquests/dtos/ICreateConquestDTO";
import { IUpdateConquestDTO } from "@modules/conquests/dtos/IUpdateConquestDTO";
import { IDeleteConquestDTO } from "@modules/conquests/dtos/IDeleteConquestDTO";
import { IShowConquestDTO } from "@modules/conquests/dtos/IShowConquestDTO";


import { Conquest } from "../infra/knex/entities/Conquest";

export interface IConquestsRepository {
  create(data: ICreateConquestDTO ): Promise<Conquest>;
  update(data: IUpdateConquestDTO) : Promise<Conquest>;
  delete(data: IDeleteConquestDTO) : Promise<Conquest[]>;
  show(data: IShowConquestDTO) : Promise<Conquest[]>;
  index() : Promise<Conquest[]>;
}
