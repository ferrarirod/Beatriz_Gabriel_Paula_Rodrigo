import { ICreateManyTasksQuestionsDTO } from "@modules/tasksQuestions/dtos/ICreateManyTasksQuestionsDTO";
import { ICreateTasksQuestionsDTO } from "@modules/tasksQuestions/dtos/ICreateTasksQuestionsDTO";
import { ITasksQuestionsRepository } from "@modules/tasksQuestions/repositories/ITasksQuestionsRepository";

import { connection } from "@shared/infra/knex";
import { TaskQuestion } from "../entities/TaskQuestion";

class TasksQuestionsRepository implements ITasksQuestionsRepository {
  public async create({
    task_id,
    question_id,
  }: ICreateTasksQuestionsDTO): Promise<void> {
    const newTask = new TaskQuestion({
      task_id,
      question_id,
    });

    await connection<TaskQuestion>("tasks_questions").insert(newTask);
  }
}

export { TasksQuestionsRepository };
