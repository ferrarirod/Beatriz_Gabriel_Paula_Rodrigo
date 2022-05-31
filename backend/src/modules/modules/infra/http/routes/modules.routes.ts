import { Router } from "express";
import { ModulesController } from "../controllers/ModulesController";

const modulesRoutes = Router();

const modulesController = new ModulesController();

modulesRoutes.post("/", modulesController.create);
modulesRoutes.get("/:id", modulesController.show);
modulesRoutes.get("/", modulesController.index);
modulesRoutes.put("/:id", modulesController.update);
modulesRoutes.delete("/:id", modulesController.delete);

export { modulesRoutes };
