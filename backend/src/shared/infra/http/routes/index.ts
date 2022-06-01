import { Router } from "express";

import { usersRoutes } from "@modules/users/infra/http/routes/users.routes";
import { modulesRoutes } from "@modules/modules/infra/http/routes/modules.routes";


const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/modules", modulesRoutes);


export { routes };
