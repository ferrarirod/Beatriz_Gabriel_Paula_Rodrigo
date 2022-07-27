import { ListClassesByModuleService } from "@modules/classes/services/ListClassesByModuleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ClassesModuleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { module_id } = request.params;

    const listClassesByModuleService = container.resolve(
      ListClassesByModuleService
    );

    const classes = await listClassesByModuleService.execute({ module_id });

    return response.json(classes);
  }
}

export { ClassesModuleController };
