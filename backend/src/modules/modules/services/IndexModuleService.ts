import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Module } from "../infra/knex/entities/Module";
import { IModulesRepository } from "../repositories/IModulesRepository";

@injectable()
class IndexModuleService {
    constructor(
        @inject("ModulesRepository")
        private ModulesRepository: IModulesRepository,
    ) { }

    public async execute(): Promise<Module[]> {

        const modules = await this.ModulesRepository.index();

        return modules;
    }
}

export { IndexModuleService };