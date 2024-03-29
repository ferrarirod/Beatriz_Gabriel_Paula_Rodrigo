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
import { QuestionsRepository } from "@modules/questions/infra/knex/repositories/QuestionsRepository";
import { IQuestionsRepository } from "@modules/questions/repositories/IQuestionsRepository";
import { OptionsRepository } from "@modules/options/infra/knex/repositories/OptionsRepository";
import { IOptionsRepository } from "@modules/options/repositories/IOptionsRepository";

import { IFinishedClassesRepository } from "@modules/finishedClasses/repositories/IFinishedClassesRepository";
import { FinishedClassesRepository } from "@modules/finishedClasses/infra/knex/repositories/FinishedClassesRepository";
import { ITasksQuestionsRepository } from "@modules/tasksQuestions/repositories/ITasksQuestionsRepository";
import { TasksQuestionsRepository } from "@modules/tasksQuestions/infra/knex/repositories/TasksQuestionsRepository";
import { IAnswersRepository } from "@modules/answers/repositories/IAnswersRepository";
import { AnswersRepository } from "@modules/answers/infra/knex/repositories/AnswersRepository";
import { AwardsRepository } from "@modules/awards/infra/knex/repositories/AwardsRepository";
import { IAwardsRepository } from "@modules/awards/repositories/IAwardsRepository";
import { ConquestsRepository } from "@modules/conquests/infra/knex/repositories/ConquestsRepository";
import { IConquestsRepository } from "@modules/conquests/repositories/IConquestsRepository";

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

container.registerSingleton<IQuestionsRepository>(
  "QuestionsRepository",
  QuestionsRepository
);

container.registerSingleton<IOptionsRepository>(
  "OptionsRepository",
  OptionsRepository
);

container.registerSingleton<IFinishedClassesRepository>(
  "FinishedClassesRepository",
  FinishedClassesRepository
);

container.registerSingleton<ITasksQuestionsRepository>(
  "TasksQuestionsRepository",
  TasksQuestionsRepository
);

container.registerSingleton<IAnswersRepository>(
  "AnswersRepository",
  AnswersRepository
);
container.registerSingleton<IAwardsRepository>(
  "AwardsRepository",
  AwardsRepository
);

container.registerSingleton<IConquestsRepository>(
  "ConquestsRepository",
  ConquestsRepository
);

