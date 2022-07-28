import { Router } from "express";
import { ConquestsController } from "../controllers/ConquestsController";

const conquestsRoutes = Router();

const conquestsController = new ConquestsController();

conquestsRoutes.post("/", conquestsController.create);
conquestsRoutes.get("/:id", conquestsController.show);
conquestsRoutes.get("/", conquestsController.index);
conquestsRoutes.put("/:id", conquestsController.update);
conquestsRoutes.delete("/:id", conquestsController.delete);

export { conquestsRoutes };
