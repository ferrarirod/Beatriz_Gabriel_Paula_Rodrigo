import { container } from "tsyringe";

import "@modules/users/providers";

import { UsersRepository } from "@modules/users/infra/knex/repositories/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ClassesRepository } from "@modules/classes/infra/knex/repositories/ClassesRepository";
import { IClassesRepository } from "@modules/classes/repositories/IClassesRepository";
import { ModuleRepository } from "@modules/modules/infra/knex/repositories/ModulesRepository";
import { IModulesRepository } from "@modules/modules/repositories/IModulesRepository";
import { CommentRepository } from "@modules/comments/infra/knex/repositories/CommentsRepository";
import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";
import { TasksRepository } from "@modules/tasks/infra/knex/repositories/TasksRepository";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { IFinishedClassesRepository } from "@modules/finishedClasses/repositories/IFinishedClassesRepository";
import { FinishedClassesRepository } from "@modules/finishedClasses/infra/knex/repositories/FinishedClassesRepository";


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
container.registerSingleton<ICommentsRepository>(
  "CommentsRepository",
  CommentRepository
);
container.registerSingleton<ITasksRepository>(
  "TasksRepository",
  TasksRepository
);

container.registerSingleton<IFinishedClassesRepository>(
  "FinishedClassesRepository",
  FinishedClassesRepository
);
