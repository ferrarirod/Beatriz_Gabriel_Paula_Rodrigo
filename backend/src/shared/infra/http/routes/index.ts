import { Router } from "express";

import { usersRoutes } from "@modules/users/infra/http/routes/users.routes";
import { sessionsRoutes } from "@modules/users/infra/http/routes/sessions.routes";
import { classesRoutes } from "@modules/classes/infra/http/routes/classes.routes";
import { modulesRoutes } from "@modules/modules/infra/http/routes/modules.routes";


const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes)
routes.use("/classes", classesRoutes);
routes.use("/modules", modulesRoutes);


export { routes };
