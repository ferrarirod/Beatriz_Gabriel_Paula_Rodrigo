import { Router } from "express";
import { QuestionsController } from "../controllers/QuestionsControllers";

const questionsRoutes = Router();

const questionsController = new QuestionsController();

questionsRoutes.post("/", questionsController.create);
questionsRoutes.get("/:id", questionsController.show);
questionsRoutes.get("/", questionsController.index);
questionsRoutes.put("/:id", questionsController.update);
questionsRoutes.delete("/:id", questionsController.delete);

export { questionsRoutes };
