import { AuthMiddleware } from "@shared/infra/http/middlewares/AuthMidddleware";
import { Router } from "express";
import { AnswersController } from "../controllers/AnswersController";

const answersRoutes = Router();

const answersController = new AnswersController();

const authMiddleware = new AuthMiddleware()

answersRoutes.use(authMiddleware.isAuthenticate);

answersRoutes.post("/", answersController.create);

export { answersRoutes };
