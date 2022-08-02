import { Router } from "express";
import { ClassCommentsController } from "../controllers/ClassCommentsController";
import { CommentsController } from "../controllers/CommentsController";

const commentsRoutes = Router();

const commentsController = new CommentsController();
const classCommentsController = new ClassCommentsController();

commentsRoutes.post("/", commentsController.create);
commentsRoutes.get("/:id", commentsController.show);
commentsRoutes.get("/", commentsController.index);
commentsRoutes.put("/:id", commentsController.update);
commentsRoutes.delete("/:id", commentsController.delete);

commentsRoutes.get("/class/:class_id", classCommentsController.index);

export { commentsRoutes };
