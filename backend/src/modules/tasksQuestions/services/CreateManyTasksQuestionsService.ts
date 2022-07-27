import { inject, injectable } from "tsyringe";
import { ICreateManyTasksQuestionsDTO } from "../dtos/ICreateManyTasksQuestionsDTO";
import { ITasksQuestionsRepository } from "../repositories/ITasksQuestionsRepository";

@injectable()
class CreateManyTasksQuestionsService {
  constructor(
    @inject("TasksQuestionsRepository")
    private tasksQuestionsRepository: ITasksQuestionsRepository
  ) {}

  public async execute({
    task_id,
    questions_id,
  }: ICreateManyTasksQuestionsDTO) {
    await this.tasksQuestionsRepository.deleteByTask(task_id);
    const tasksQuestions = [];

    for (var i = 0; i < questions_id.length; i++) {
      let taskQuestion = await this.tasksQuestionsRepository.create({
        task_id,
        question_id: questions_id[i],
      });

      tasksQuestions.push(taskQuestion);
    }

    return tasksQuestions;
  }
}

export { CreateManyTasksQuestionsService };
