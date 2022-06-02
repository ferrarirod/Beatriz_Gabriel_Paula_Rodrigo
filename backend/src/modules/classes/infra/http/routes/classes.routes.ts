import { Router } from "express";
import { ClassesController } from "../controllers/ClassesControllers"

const classesRoutes = Router();

const classesController = new ClassesController();

classesRoutes.post("/", classesController.create);
classesRoutes.get("/:id", classesController.show);
classesRoutes.get("/", classesController.index);
classesRoutes.put("/:id", classesController.update);
classesRoutes.delete("/:id", classesController.delete);

export { classesRoutes };
