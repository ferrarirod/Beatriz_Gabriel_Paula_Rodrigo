import { inject, injectable } from "tsyringe";
import { ITasksQuestionsRepository } from "../repositories/ITasksQuestionsRepository";

interface IRequest{
    task_id: string;
}

@injectable()
class ListTaskWithQuestionsAndOptionsService{

    constructor(
        @inject("TasksQuestionsRepository")
        private tasksQuestionsRepository: ITasksQuestionsRepository
    ){}

    public async execute({ task_id }:IRequest){

        const tasksQuestions = await this.tasksQuestionsRepository.findByTaskId(task_id)

        return tasksQuestions
    }
}

export { ListTaskWithQuestionsAndOptionsService }