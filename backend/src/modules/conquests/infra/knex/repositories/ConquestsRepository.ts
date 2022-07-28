import { ICreateConquestDTO } from "@modules/conquests/dtos/ICreateConquestDTO";
import { IUpdateConquestDTO } from "@modules/conquests/dtos/IUpdateConquestDTO";
import { IDeleteConquestDTO } from "@modules/conquests/dtos/IDeleteConquestDTO";
import { IShowConquestDTO } from "@modules/conquests/dtos/IShowConquestDTO";
import { IConquestsRepository } from "@modules/conquests/repositories/IConquestsRepository";
import { Conquest } from "../entities/Conquest";
import { connection } from "@shared/infra/knex";
import { CreateConquestService } from "@modules/conquests/services/CreateConquestService";

class ConquestsRepository implements IConquestsRepository {


  public async create({
    user_id,
    award_id
  }: ICreateConquestDTO): Promise<Conquest> {
    
    const newConquest = new Conquest({ user_id,
      award_id });

    await connection<Conquest>("conquests").insert(newConquest);

    return newConquest;
  }
  public async update({
    id,
    user_id,
    award_id
  }: IUpdateConquestDTO): Promise<Conquest> {
    const updatedConquest = new Conquest({ user_id,
      award_id });
    await connection<Conquest>("conquests").where({id}).update({user_id,
      award_id });
    updatedConquest.id = id;
    return updatedConquest;
  }
  public async show({
    id
  }: IShowConquestDTO) :Promise<Conquest[]>{
    const selectedConquest = await connection<Conquest>("conquests").where('id', '=' , id);
    return selectedConquest;

  }
  public async delete({
    id
  }: IDeleteConquestDTO) :Promise<Conquest[]>{
    const deletedConquest = await connection<Conquest>("conquests").where('id', '=' , id);
    await connection<Conquest>("conquests").where('id', '=' , id).del();
    return deletedConquest;
  }
  
  public async index(): Promise<Conquest[]>{
  const result = await connection<Conquest>("conquests")
    return result;
  }
}

export { ConquestsRepository };
