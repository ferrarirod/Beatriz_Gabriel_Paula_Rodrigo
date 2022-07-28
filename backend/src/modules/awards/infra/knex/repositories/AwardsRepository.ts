import { ICreateAwardDTO } from "@modules/awards/dtos/ICreateAwardDTO";
import { IUpdateAwardDTO } from "@modules/awards/dtos/IUpdateAwardDTO";
import { IDeleteAwardDTO } from "@modules/awards/dtos/IDeleteAwardDTO";
import { IShowAwardDTO } from "@modules/awards/dtos/IShowAwardDTO";

import { IAwardsRepository } from "@modules/awards/repositories/IAwardsRepository";
import { Award } from "../entities/Award";
import { connection } from "@shared/infra/knex";

class AwardsRepository implements IAwardsRepository {

  public async create({
    name,
    description, score,
  }: ICreateAwardDTO): Promise<Award> {
    console.log("create award")
    const award = new Award({ name, description, score });

    await connection<Award>("awards").insert(award);

    return award;
  }

  public async update({
    id,
    name,
    description, score
  }: IUpdateAwardDTO): Promise<Award> {
    const aaward = new Award({ name, description, score });

    await connection<Award>("awards").where('id', '=', id).update(aaward);

    return aaward;
  }
  public async show({
    id
  }: IShowAwardDTO): Promise<Award[]> {
    const selectedaward = await connection<Award>("awards").where('id', '=', id);
    return selectedaward;

  }
  public async delete({
    id
  }: IDeleteAwardDTO): Promise<Award[]> {
    const deletedaward = await connection<Award>("awards").where('id', '=', id);
    await connection<Award>("awards").where('id', '=', id).del();
    return deletedaward;
  }
  public async index(): Promise<Award[]> {
    const awards = await connection<Award>("awards").select();
    return awards;
  }
}

export { AwardsRepository };
