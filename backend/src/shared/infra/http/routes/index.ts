import { Router } from "express";

import { usersRoutes } from "@modules/users/infra/http/routes/users.routes";
import { sessionsRoutes } from "@modules/users/infra/http/routes/sessions.routes";
import { classesRoutes } from "@modules/classes/infra/http/routes/classes.routes";
import { modulesRoutes } from "@modules/modules/infra/http/routes/modules.routes";
import { commentsRoutes } from "@modules/comments/infra/http/routes/comments.routes";
import { tasksRoutes } from "@modules/tasks/infra/http/routes/tasks.routes";
import { finishedClassesRoutes } from "@modules/finishedClasses/infra/http/routes/finishedClasses.routes";



const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes)
routes.use("/classes", classesRoutes);
routes.use("/modules", modulesRoutes);
routes.use("/comments", commentsRoutes);
routes.use("/tasks", tasksRoutes);
routes.use("/finishedClasses", finishedClassesRoutes);



export { routes };
