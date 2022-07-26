import { CountFinishedClassesByUserService } from "@modules/finishedClasses/services/CountFinishedClassesByUserService";
import { ListFinishedClassesByUserService } from "@modules/finishedClasses/services/ListFinishedClassesByUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class FinishedClassesUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listFinishedClassesByUserService = container.resolve(
      ListFinishedClassesByUserService
    );

    const finishedClasses = await listFinishedClassesByUserService.execute({
      user_id,
    });

    return response.json(finishedClasses);
  }

  public async count(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const countFinishedClassesByUserService = container.resolve(
      CountFinishedClassesByUserService
    );

    const finishedClasses = await countFinishedClassesByUserService.execute({
      user_id,
    });

    return response.json(finishedClasses);
  }
}

export { FinishedClassesUserController };
