import { CreateAwardService } from "@modules/awards/services/CreateAwardService";
import { IndexAwardService } from "@modules/awards/services/IndexAwardService";
import { UpdateAwardService } from "@modules/awards/services/UpdateAwardService";
import { DeleteAwardService } from "@modules/awards/services/DeleteAwardService";
import { ShowAwardService } from "@modules/awards/services/ShowAwardService";


import { Request, Response } from "express";
import { container } from "tsyringe";

class AwardsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, score } = request.body;
console.log('score',score)
    const createAwardService = container.resolve(CreateAwardService);

    const award = await createAwardService.execute({
      name,
      description, score,
    });

    return response.json(award);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexAwardService = container.resolve(IndexAwardService);
    const awards = await indexAwardService.execute();

    return response.json(awards);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showAwardService = container.resolve(ShowAwardService);
    const selectedAward = await showAwardService.execute({ id });
    return response.json(selectedAward);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, score } = request.body;
    const id = request.params.id;

    const updateAwardService = container.resolve(UpdateAwardService);
    const updatedAward = await updateAwardService.execute({
      id,
      name,
      description, score,
    });

    return response.json(updatedAward);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteAwardService = container.resolve(DeleteAwardService);
    const deletedAward = await deleteAwardService.execute({ id });
    return response.json(deletedAward);
  }
}

export { AwardsController };
