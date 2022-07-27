import { AuthMiddleware } from "@shared/infra/http/middlewares/AuthMidddleware";
import { Router } from "express";
import { FinishedClassesClassController } from "../controllers/FinishedClassesClassController";
import { FinishedClassesController } from "../controllers/FinishedClassesController";
import { FinishedClassesUserController } from "../controllers/FinishedClassesUserController";

const finishedClassesRoutes = Router();

const authMiddleware = new AuthMiddleware();

const finishedClassesController = new FinishedClassesController();
const finishedClassesUserController = new FinishedClassesUserController();
const finishedClassesClassController = new FinishedClassesClassController();

finishedClassesRoutes.use(authMiddleware.isAuthenticate);

finishedClassesRoutes.post("/", finishedClassesController.create);

finishedClassesRoutes.get("/:user_id", finishedClassesUserController.index);
finishedClassesRoutes.get("/count/:user_id", finishedClassesUserController.count);

finishedClassesRoutes.get("/class/:class_id", finishedClassesClassController.show);

export { finishedClassesRoutes };
