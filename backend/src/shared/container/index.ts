import { container } from "tsyringe";

import "@modules/users/providers";

import { UsersRepository } from "@modules/users/infra/knex/repositories/UsersRepository";
import { ModuleRepository } from "@modules/modules/infra/knex/repositories/ModulesRepository";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IModulesRepository } from "@modules/modules/repositories/IModulesRepository";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IModulesRepository>(
  "ModulesRepository",
  ModuleRepository
);
