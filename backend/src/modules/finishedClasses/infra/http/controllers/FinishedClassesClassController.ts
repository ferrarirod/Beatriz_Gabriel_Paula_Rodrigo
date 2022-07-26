import { ShowFinishedClassesByClassIdService } from "@modules/finishedClasses/services/ShowFinishedClassesByClassIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class FinishedClassesClassController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { class_id } = request.params;

    const showFinishedClassesByClassIdService = container.resolve(
      ShowFinishedClassesByClassIdService
    );

    const finishedClass = await showFinishedClassesByClassIdService.execute({
      class_id,
    });

    return response.json(finishedClass);
  }
}

export { FinishedClassesClassController }