import { ICreateModuleDTO } from "@modules/modules/dtos/ICreateModuleDTO";
import { IUpdateModuleDTO } from "@modules/modules/dtos/IUpdateModuleDTO";
import { IDeleteModuleDTO } from "@modules/modules/dtos/IDeleteModuleDTO";
import { IShowModuleDTO } from "@modules/modules/dtos/IShowModuleDTO";


import { Module } from "../infra/knex/entities/Module";

export interface IModulesRepository {
    create(data: ICreateModuleDTO): Promise<Module>;
    update(data: IUpdateModuleDTO): Promise<Module>;
    delete(data: IDeleteModuleDTO): Promise<Module[]>;
    show(data: IShowModuleDTO): Promise<Module[]>;
    index(): Promise<Module[]>;

}