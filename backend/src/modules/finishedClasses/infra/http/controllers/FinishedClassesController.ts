import { CreateFinishedClassesService } from "@modules/finishedClasses/services/CreateFinishedClassesService";
import { Request, Response } from "express";
import { container } from "tsyringe";




class FinishedClassesController{

    public async create(request: Request, response: Response):Promise<Response>{

        const { class_id, user_id } = request.body;

        const createFinishedClassesService = container.resolve(CreateFinishedClassesService);

        const finishedClass = await createFinishedClassesService.execute({
            user_id,
            class_id
        })

        return response.json(finishedClass)
    }
}

export { FinishedClassesController }