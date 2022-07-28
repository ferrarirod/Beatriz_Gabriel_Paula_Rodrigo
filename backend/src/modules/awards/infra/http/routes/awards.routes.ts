import { Router } from "express";
import { AwardsController } from "../controllers/AwardsController";

const awardsRoutes = Router();

const awardsController = new AwardsController();

awardsRoutes.post("/", awardsController.create);
awardsRoutes.get("/:id", awardsController.show);
awardsRoutes.get("/", awardsController.index);
awardsRoutes.put("/:id", awardsController.update);
awardsRoutes.delete("/:id", awardsController.delete);

export { awardsRoutes };
