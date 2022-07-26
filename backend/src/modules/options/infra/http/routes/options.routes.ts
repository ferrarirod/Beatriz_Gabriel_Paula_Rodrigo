import { Router } from "express";
import { OptionsController } from "../controllers/OptionsController";

const optionsRoutes = Router();

const optionsController = new OptionsController();

optionsRoutes.post("/", optionsController.create);
optionsRoutes.get("/:id", optionsController.show);
optionsRoutes.get("/", optionsController.index);
optionsRoutes.put("/:id", optionsController.update);
optionsRoutes.delete("/:id", optionsController.delete);

export { optionsRoutes };
