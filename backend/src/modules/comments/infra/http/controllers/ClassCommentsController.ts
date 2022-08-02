import { ListCommentsByClassService } from "@modules/comments/services/ListCommentsByClassService";
import { Request, Response } from "express";
import { container } from "tsyringe";



class ClassCommentsController{

    public async index(request: Request, response: Response):Promise<Response>{

        const { class_id } = request.params;

        const listCommentsByClassService = container.resolve(ListCommentsByClassService);

        const comments = await listCommentsByClassService.execute({
            class_id
        })

        return response.json(comments)
    }
}

export { ClassCommentsController }