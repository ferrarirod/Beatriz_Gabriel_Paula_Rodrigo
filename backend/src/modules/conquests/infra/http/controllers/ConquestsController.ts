import { CreateConquestService } from "@modules/conquests/services/CreateConquestService";
import { UpdateConquestService } from "@modules/conquests/services/UpdateConquestService";
import { DeleteConquestService } from "@modules/conquests/services/DeleteConquestService";
import { ShowConquestService } from "@modules/conquests/services/ShowConquestService";
import { IndexConquestService } from "@modules/conquests/services/IndexConquestService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ConquestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, award_id } = request.body;
    const createConquestService = container.resolve(CreateConquestService);

    const newConquest = await createConquestService.execute({
        user_id,
        award_id
    });

    return response.json(newConquest);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexConquestService = container.resolve(IndexConquestService);
    const conquests = await indexConquestService.execute();
    return response.json(conquests);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const showConquestService = container.resolve(ShowConquestService);
    const selectedConquest = await showConquestService.execute({id});
    return response.json(selectedConquest);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const {user_id, award_id } = request.body;
    const {id} = request.params;
    const updateConquestService = container.resolve(UpdateConquestService);
    const updatedConquest = await updateConquestService.execute({
      id,
      user_id,
      award_id
    });
    return response.json(updatedConquest);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteConquestService = container.resolve(DeleteConquestService);
    const deletedConquest = await deleteConquestService.execute({id});
    return response.json(deletedConquest);
  }
}

export { ConquestsController };
