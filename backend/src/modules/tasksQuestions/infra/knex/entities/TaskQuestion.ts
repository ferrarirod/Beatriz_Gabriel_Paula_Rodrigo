import { Question } from "@modules/questions/infra/knex/entities/Question";
import { v4 as uuid } from "uuid";
import { Task } from "@modules/tasks/infra/knex/entities/Task";
import { ICreateTasksQuestionsDTO } from "@modules/tasksQuestions/dtos/ICreateTasksQuestionsDTO";

class TaskQuestion {
  id: string;

  question_id: string | Question;

  task_id: string | Task;

  created_at: Date;

  updated_at: Date;

  constructor({ task_id, question_id }: ICreateTasksQuestionsDTO) {
    this.id = uuid();
    this.task_id = task_id;
    this.question_id = question_id;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { TaskQuestion };
