import { CreateOptionService } from "@modules/options/services/CreateOptionService";
import { IndexOptionService } from "@modules/options/services/IndexOptionService";
import { UpdateOptionService } from "@modules/options/services/UpdateOptionService";
import { DeleteOptionService } from "@modules/options/services/DeleteOptionService";
import { ShowOptionService } from "@modules/options/services/ShowOptionService";


import { Request, Response } from "express";
import { container } from "tsyringe";

class OptionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, question_id, chalenge_id } = request.body;

    const createOptionService = container.resolve(CreateOptionService);

    const option = await createOptionService.execute({
      name,
      description,
      question_id,
      chalenge_id
    });

    return response.json(option);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexOptionService = container.resolve(IndexOptionService);
    const options = await indexOptionService.execute();

    return response.json(options);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showOptionService = container.resolve(ShowOptionService);
    const selectedOption = await showOptionService.execute({ id });
    return response.json(selectedOption);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const id = request.params.id;

    const updateOptionService = container.resolve(UpdateOptionService);
    const updatedOption = await updateOptionService.execute({
      id,
      name,
      description,
    });

    return response.json(updatedOption);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteOptionService = container.resolve(DeleteOptionService);
    const deletedOption = await deleteOptionService.execute({ id });
    return response.json(deletedOption);
  }
}

export { OptionsController };
