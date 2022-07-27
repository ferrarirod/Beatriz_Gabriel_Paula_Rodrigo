import { Router } from "express";
import { TasksQuestionsController } from "../controllers/TasksQuestionsController";



const tasksQuestionsRoutes = Router()

const tasksQuestionsController = new TasksQuestionsController();


tasksQuestionsRoutes.post("/",tasksQuestionsController.create);

export { tasksQuestionsRoutes }