import { CreateModuleService } from "@modules/modules/services/CreateModuleService";
import { IndexModuleService } from "@modules/modules/services/IndexModuleService";
import { UpdateModuleService } from "@modules/modules/services/UpdateModuleService";
import { DeleteModuleService } from "@modules/modules/services/DeleteModuleService";
import { ShowModuleService } from "@modules/modules/services/ShowModuleService";


import { Request, Response } from "express";
import { container } from "tsyringe";

class ModulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createModuleService = container.resolve(CreateModuleService);

    const module = await createModuleService.execute({
      name,
      description,
    });

    return response.json(module);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexModuleService = container.resolve(IndexModuleService);
    const modules = await indexModuleService.execute();
    return response.json(modules);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
  public async update(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export { ModulesController };
