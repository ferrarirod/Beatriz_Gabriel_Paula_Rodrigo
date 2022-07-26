import { container } from "tsyringe";

import "@modules/users/providers";

import { UsersRepository } from "@modules/users/infra/knex/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ClassesRepository } from "@modules/classes/infra/knex/repositories/ClassesRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ModuleRepository } from "@modules/modules/infra/knex/repositories/ModulesRepository";
import { IModulesRepository } from "@modules/modules/repositories/IModulesRepository";
import { TasksRepository } from "@modules/tasks/infra/knex/repositories/TasksRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { QuestionsRepository } from "@modules/questions/infra/knex/repositories/QuestionsRepository";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { OptionsRepository } from "@modules/options/infra/knex/repositories/OptionsRepository";
import { IOptionsRepository } from "@modules/options/repositories/IOptionsRepository";





container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IClassesRepository>(
  "ClassesRepository",
  ClassesRepository
);
container.registerSingleton<IModulesRepository>(
  "ModulesRepository",
  ModuleRepository
);

container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);

container.registerSingleton<IQuestionsRepository>(
  "QuestionsRepository",
  QuestionsRepository
);

container.registerSingleton<IOptionsRepository>(
  "OptionsRepository",
  OptionsRepository
);

