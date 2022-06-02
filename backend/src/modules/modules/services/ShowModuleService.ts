import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowModuleDTO } from "../dtos/IShowModuleDTO";
import { Module } from "../infra/knex/entities/Module";
import { IModulesRepository } from "../repositories/IModulesRepository";

@injectable()
class ShowModuleService {
    constructor(
        @inject("ModulesRepository")
        private ModulesRepository: IModulesRepository,
    ) { }

    public async execute({
        id,
    }: IShowModuleDTO): Promise<Module[]> {

        const Module = await this.ModulesRepository.show({
            id,
        });

        return Module;
    }
}

export { ShowModuleService };