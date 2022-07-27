import { Router } from "express";
import { ClassesController } from "../controllers/ClassesControllers";
import { ClassesModuleController } from "../controllers/ClassesModuleController";

const classesRoutes = Router();

const classesController = new ClassesController();
const classesModuleController = new ClassesModuleController();

classesRoutes.post("/", classesController.create);
classesRoutes.get("/:id", classesController.show);
classesRoutes.get("/", classesController.index);
classesRoutes.put("/:id", classesController.update);
classesRoutes.delete("/:id", classesController.delete);

classesRoutes.get("/module/:module_id", classesModuleController.index);

export { classesRoutes };
