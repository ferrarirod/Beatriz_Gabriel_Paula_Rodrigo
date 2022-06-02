import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateModuleDTO } from "../dtos/IUpdateModuleDTO";
import { Module } from "../infra/knex/entities/Module";
import { IModulesRepository } from "../repositories/IModulesRepository";

@injectable()
class UpdateModuleService {
    constructor(
        @inject("ModulesRepository")
        private ModulesRepository: IModulesRepository,
    ) { }

    public async execute({
        id,
        name,
        description,
    }: IUpdateModuleDTO): Promise<Module> {

        const Module = await this.ModulesRepository.update({
            id,
            name,
            description
        });

        return Module;
    }
}

export { UpdateModuleService };