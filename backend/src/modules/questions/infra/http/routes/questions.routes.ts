import { Router } from "express";
import { QuestionsController } from "../controllers/QuestionsControllers";
import { QuestionsOptionsController } from "../controllers/QuestionsOptionsController";

const questionsRoutes = Router();

const questionsController = new QuestionsController();
const questionsOptionsController = new QuestionsOptionsController();

questionsRoutes.post("/", questionsController.create);
questionsRoutes.get("/:id", questionsController.show);
questionsRoutes.get("/", questionsController.index);
questionsRoutes.put("/:id", questionsController.update);
questionsRoutes.delete("/:id", questionsController.delete);

questionsRoutes.post("/options", questionsOptionsController.create);


export { questionsRoutes };
