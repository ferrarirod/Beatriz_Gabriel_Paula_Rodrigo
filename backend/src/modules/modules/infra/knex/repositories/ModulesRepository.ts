import { ICreateModuleDTO } from "@modules/modules/dtos/ICreateModuleDTO";
import { IUpdateModuleDTO } from "@modules/modules/dtos/IUpdateModuleDTO";
import { IDeleteModuleDTO } from "@modules/modules/dtos/IDeleteModuleDTO";
import { IShowModuleDTO } from "@modules/modules/dtos/IShowModuleDTO";

import { IModulesRepository } from "@modules/modules/repositories/IModulesRepository";
import { Module } from "../entities/Module";
import { connection } from "@shared/infra/knex";

class ModuleRepository implements IModulesRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = connection<Module>("modules");
  }


  public async create({
    id,
    name,
    description,
  }: ICreateModuleDTO): Promise<Module> {
    const module = new Module({ id, name, description });

    await this.ormRepository.insert(module);

    return module;
  }

  public async update({
    id,
    name,
    description
  }: IUpdateModuleDTO): Promise<Module> {
    const aModule = new Module({ id, name, description });

    await this.ormRepository.where('id', '=', id).update(aModule);

    return aModule;
  }
  public async show({
    id
  }: IShowModuleDTO): Promise<Module[]> {
    const selectedModule = await this.ormRepository.where('id', '=', id);
    return selectedModule;

  }
  public async delete({
    id
  }: IDeleteModuleDTO): Promise<Module[]> {
    const deletedModule = await this.ormRepository.where('id', '=', id);
    await this.ormRepository.where('id', '=', id).del();
    return deletedModule;
  }
  public async index(): Promise<Module[]> {
    const modules = await this.ormRepository.select();
    return modules;
  }
}

export { ModuleRepository };
