import { ICreateTaskDTO } from "@modules/tasks/dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "@modules/tasks/dtos/IUpdateTaskDTO";
import { IDeleteTaskDTO } from "@modules/tasks/dtos/IDeleteTaskDTO";
import { IShowTaskDTO } from "@modules/tasks/dtos/IShowTaskDTO";
import { ITasksRepository } from "@modules/tasks/repositories/ITasksRepository";
import { Task } from "../entities/Task";
import { connection } from "@shared/infra/knex";
import { CreateTaskService } from "@modules/tasks/services/CreateTaskService";

class TasksRepository implements ITasksRepository {


  public async create({
    title,
    class_id,
    description,
    status
  }: ICreateTaskDTO): Promise<Task> {
    
    const newTask = new Task({ title,
      class_id,
      description,
      status});

    await connection<Task>("tasks").insert(newTask);

    return newTask;
  }
  public async update({
    id,
    title,
    class_id,
    description,
    status
  }: IUpdateTaskDTO): Promise<Task> {
    const updatedTask = new Task({ title,
      class_id,
      description,
      status });
    await connection<Task>("tasks").where({id}).update({ title,
      class_id,
      description,
      status });

    updatedTask.id = id;
    return updatedTask;
  }
  public async show({
    id
  }: IShowTaskDTO) :Promise<Task[]>{
    const selectedTask = await connection<Task>("tasks").where('id', '=' , id);
    return selectedTask;

  }
  public async delete({
    id
  }: IDeleteTaskDTO) :Promise<Task[]>{
    const deletedTask = await connection<Task>("tasks").where('id', '=' , id);
    await connection<Task>("tasks").where('id', '=' , id).del();
    return deletedTask;
  }
  
  public async index(): Promise<Task[]>{
   const result = await connection<Task>("tasks").select('tasks.*','classes.id','classes.title').
                                                     join('classes', 'tasks.class_id', '=', 'classes.id')
                                                   .options({nestTables: true})
                                                      
    const allTasks = [] as Task[];
   result.map( ({tasks,classes}) =>{
      const task = new Task(tasks)
      task.class_id = classes;
      task.id = tasks.id;
      allTasks.push(task);
    })
    return allTasks;
  }
}

export { TasksRepository };
