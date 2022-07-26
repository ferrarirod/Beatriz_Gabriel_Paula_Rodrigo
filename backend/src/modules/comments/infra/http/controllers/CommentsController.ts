import { CreateCommentService } from "@modules/comments/services/CreateCommentService";
import { IndexCommentService } from "@modules/comments/services/IndexCommentService";
import { UpdateCommentService } from "@modules/comments/services/UpdateCommentService";
import { DeleteCommentService } from "@modules/comments/services/DeleteCommentService";
import { ShowCommentService } from "@modules/comments/services/ShowCommentService";


import { Request, Response } from "express";
import { container } from "tsyringe";

class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, class_id, content, is_anonymous, } = request.body;

    const createCommentService = container.resolve(CreateCommentService);

    const comment = await createCommentService.execute({
      user_id,
      class_id,
      content,
      is_anonymous,
    });

    return response.json(comment);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const indexCommentService = container.resolve(IndexCommentService);
    const comments = await indexCommentService.execute();

    return response.json(comments);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showCommentService = container.resolve(ShowCommentService);
    const selectedComment = await showCommentService.execute({ id });
    return response.json(selectedComment);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, class_id, content, is_anonymous } = request.body;
    const id = request.params.id;

    const updateCommentService = container.resolve(UpdateCommentService);
    const updatedComment = await updateCommentService.execute({
      id,
      user_id,
      class_id,
      content,
      is_anonymous,
    });

    return response.json(updatedComment);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteCommentService = container.resolve(DeleteCommentService);
    const deletedComment = await deleteCommentService.execute({ id });
    return response.json(deletedComment);
  }
}

export { CommentsController };
