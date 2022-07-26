import { Request, Response } from "express";




class FinishedClassesController{

    public async create(request: Request, response: Response):Promise<Response>{

        const { class_id, user_id } = request.body;

        return response.json()
    }
}

export { FinishedClassesController }