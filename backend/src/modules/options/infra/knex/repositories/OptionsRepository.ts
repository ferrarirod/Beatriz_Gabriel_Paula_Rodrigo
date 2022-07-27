import { ICreateOptionDTO } from "@modules/options/dtos/ICreateOptionDTO";
import { IUpdateOptionDTO } from "@modules/options/dtos/IUpdateOptionDTO";
import { IDeleteOptionDTO } from "@modules/options/dtos/IDeleteOptionDTO";
import { IShowOptionDTO } from "@modules/options/dtos/IShowOptionDTO";

import { IOptionsRepository } from "@modules/options/repositories/IOptionsRepository";
import { Option } from "../entities/Option";

import { connection } from "@shared/infra/knex";

class OptionsRepository implements IOptionsRepository {

  public async create({
    name,
    question_id,
  }: ICreateOptionDTO): Promise<Option> {
    const option = new Option({ name, question_id });

    await connection<Option>("options").insert(option);

    return option;
  }

  public async update({
    id,
    name,
    question_id
  }: IUpdateOptionDTO): Promise<Option> {
    const aOption = new Option({ name, question_id });

    await connection<Option>("options").where('id', '=', id).update(aOption);

    return aOption;
  }
  public async show({
    id
  }: IShowOptionDTO): Promise<Option[]> {
    const selectedOption = await connection<Option>("options").where('id', '=', id);
    return selectedOption;

  }
  public async delete({
    id
  }: IDeleteOptionDTO): Promise<Option[]> {
    const deletedOption = await connection<Option>("options").where('id', '=', id);
    await connection<Option>("options").where('id', '=', id).del();
    return deletedOption;
  }
  public async index(): Promise<Option[]> {
    const options = await connection<Option>("options").select();
    return options;
  }
}

export { OptionsRepository };
