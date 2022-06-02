import { ICreateModuleDTO } from "@modules/modules/dtos/ICreateModuleDTO";
import { IUpdateModuleDTO } from "@modules/modules/dtos/IUpdateModuleDTO";
import { IDeleteModuleDTO } from "@modules/modules/dtos/IDeleteModuleDTO";
import { IShowModuleDTO } from "@modules/modules/dtos/IShowModuleDTO";

import { IModulesRepository } from "@modules/modules/repositories/IModulesRepository";
import { Module } from "../entities/Module";
import { connection } from "@shared/infra/knex";

class ModuleRepository implements IModulesRepository {

  public async create({
    name,
    description,
  }: ICreateModuleDTO): Promise<Module> {
    const module = new Module({ name, description });

    await connection<Module>("modules").insert(module);

    return module;
  }

  public async update({
    id,
    name,
    description
  }: IUpdateModuleDTO): Promise<Module> {
    const aModule = new Module({ name, description });

    await connection<Module>("modules").where('id', '=', id).update(aModule);

    return aModule;
  }
  public async show({
    id
  }: IShowModuleDTO): Promise<Module[]> {
    const selectedModule = await connection<Module>("modules").where('id', '=', id);
    return selectedModule;

  }
  public async delete({
    id
  }: IDeleteModuleDTO): Promise<Module[]> {
    const deletedModule = await connection<Module>("modules").where('id', '=', id);
    await connection<Module>("modules").where('id', '=', id).del();
    return deletedModule;
  }
  public async index(): Promise<Module[]> {
    const modules = await connection<Module>("modules").select();
    return modules;
  }
}

export { ModuleRepository };
