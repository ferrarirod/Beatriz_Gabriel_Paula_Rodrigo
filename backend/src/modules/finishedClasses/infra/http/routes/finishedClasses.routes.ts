import { AuthMiddleware } from "@shared/infra/http/middlewares/AuthMidddleware";
import { Router } from "express";
import { FinishedClassesController } from "../controllers/FinishedClassesController";
import { FinishedClassesUserController } from "../controllers/FinishedClassesUserController";

const finishedClassesRoutes = Router();

const authMiddleware = new AuthMiddleware();

const finishedClassesController = new FinishedClassesController();
const finishedClassesUserController = new FinishedClassesUserController();

finishedClassesRoutes.use(authMiddleware.isAuthenticate);

finishedClassesRoutes.post("/", finishedClassesController.create);

finishedClassesRoutes.get("/:user_id", finishedClassesUserController.index);

export { finishedClassesRoutes };
