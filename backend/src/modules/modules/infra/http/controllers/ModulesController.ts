import { CreateModuleService } from "@modules/modules/services/CreateModuleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ModulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createModuleService = container.resolve(CreateModuleService);

    const module = await createModuleService.execute({
      id,
      name,
      description,
    });

    return response.json(module);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
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
