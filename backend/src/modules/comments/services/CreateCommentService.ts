import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../infra/knex/entities/Comment";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

@injectable()
class CreateCommentService {
  constructor(
    @inject("CommentsRepository")
    private CommentsRepository: ICommentsRepository,
  ) { }

  public async execute({
    user_id,
    class_id,
    content,
    is_anonymous
  }: ICreateCommentDTO): Promise<Comment> {

    const Comment = await this.CommentsRepository.create({
      user_id,
      class_id,
      content,
      is_anonymous
    });

    return Comment;
  }
}

export { CreateCommentService };