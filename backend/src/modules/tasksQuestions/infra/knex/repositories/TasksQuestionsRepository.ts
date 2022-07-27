import { ICreateManyTasksQuestionsDTO } from "@modules/tasksQuestions/dtos/ICreateManyTasksQuestionsDTO";
import { ICreateTasksQuestionsDTO } from "@modules/tasksQuestions/dtos/ICreateTasksQuestionsDTO";
import { ITasksQuestionsRepository } from "@modules/tasksQuestions/repositories/ITasksQuestionsRepository";

import { connection } from "@shared/infra/knex";
import { TaskQuestion } from "../entities/TaskQuestion";

interface RowTaskQuestion {
  task_id: string;
  option_name: string;
  option_id: string;
  option_question_id: string;
  question_title: string;
  question_description: string;
  question_expected_answer: string;
  question_score: number;
  task_title: string;
  task_description: string;
  task_score: number;
}

class TasksQuestionsRepository implements ITasksQuestionsRepository {
  public async findByTaskId(task_id: string): Promise<any[]> {
    const tasksQuestions: RowTaskQuestion[] = await connection<TaskQuestion>(
      "tasks_questions"
    )
      .where({
        task_id,
      })
      .innerJoin("questions", "questions.id", "tasks_questions.question_id")
      .innerJoin("tasks", "tasks.id", "tasks_questions.task_id")
      .innerJoin(
        "options",
        "options.question_id",
        "tasks_questions.question_id"
      )
      .select(
        "task_id",
        "options.name as option_name",
        "options.id as option_id",
        "options.question_id as option_question_id",
        "questions.title as question_title",
        "questions.description as question_description",
        "questions.expected_answer as question_expected_answer",
        "questions.score as question_score",
        "tasks.title as task_title",
        "tasks.description as task_description",
        "tasks.score as task_score"
      );

    const questions = [];

    for (var row of tasksQuestions) {
      let question = questions.findIndex((q) => q.id === row.option_question_id);
      
      if (question !== -1 && questions[question]) {
        questions[question].options.push({
          id: row.option_id,
          name: row.option_name,
        });
      } else {
        questions.push({
          id: row.option_question_id,
          title: row.question_title,
          description: row.question_description,
          expected_answer: row.question_expected_answer,
          score: row.question_score,
          task: {
            id: row.task_id,
            title: row.task_title,
            description: row.task_description,
            score: row.task_score,
          },
          options: [
            {
              id: row.option_id,
              name: row.option_name,
            },
          ],
        });
      }
    }

    return questions;
  }
  public async deleteByTask(task_id: string): Promise<void> {
    await connection<TaskQuestion>("tasks_questions")
      .where({
        task_id,
      })
      .del();
  }
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
