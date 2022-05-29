import { container } from "tsyringe";

import "@modules/users/providers";

import { UsersRepository } from "@modules/users/infra/knex/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ClassesRepository } from "@modules/classes/infra/knex/repositories/ClassesRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IClassesRepository>(
  "ClassesRepository",
  ClassesRepository
);
