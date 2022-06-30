import { Router } from "express";
import { TasksController } from "../controllers/TasksControllers";

const tasksRoutes = Router();

const tasksController = new TasksController();

tasksRoutes.post("/", tasksController.create);
tasksRoutes.get("/:id", tasksController.show);
tasksRoutes.get("/", tasksController.index);
tasksRoutes.put("/:id", tasksController.update);
tasksRoutes.delete("/:id", tasksController.delete);

export { tasksRoutes };
