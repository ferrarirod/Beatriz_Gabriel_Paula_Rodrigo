import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateModuleDTO } from "../dtos/ICreateModuleDTO";
import { Module } from "../infra/knex/entities/Module";
import { IModulesRepository } from "../repositories/IModulesRepository";

@injectable()
class CreateModuleService {
  constructor(
    @inject("ModulesRepository")
    private ModulesRepository: IModulesRepository,
  ) { }

  public async execute({
    name,
    description
  }: ICreateModuleDTO): Promise<Module> {

    const Module = await this.ModulesRepository.create({
      name,
      description
    });

    return Module;
  }
}

export { CreateModuleService };