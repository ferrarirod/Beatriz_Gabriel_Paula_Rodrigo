import { Router } from "express";
import { CommentsController } from "../controllers/CommentsController";

const commentsRoutes = Router();

const commentsController = new CommentsController();

commentsRoutes.post("/", commentsController.create);
commentsRoutes.get("/:id", commentsController.show);
commentsRoutes.get("/", commentsController.index);
commentsRoutes.put("/:id", commentsController.update);
commentsRoutes.delete("/:id", commentsController.delete);

export { commentsRoutes };
