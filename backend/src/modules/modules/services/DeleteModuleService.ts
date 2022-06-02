import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteModuleDTO } from "../dtos/IDeleteModuleDTO";
import { Module } from "../infra/knex/entities/Module";
import { IModulesRepository } from "../repositories/IModulesRepository";

@injectable()
class DeleteModuleService {
    constructor(
        @inject("ModulesRepository")
        private ModulesRepository: IModulesRepository,
    ) { }

    public async execute({
        id,
    }: IDeleteModuleDTO): Promise<Module[]> {

        const Module = await this.ModulesRepository.delete({
            id,
        });

        return Module;
    }
}

export { DeleteModuleService };