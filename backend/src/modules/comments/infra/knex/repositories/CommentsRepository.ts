import { ICreateCommentDTO } from "@modules/comments/dtos/ICreateCommentDTO";
import { IUpdateCommentDTO } from "@modules/comments/dtos/IUpdateCommentDTO";
import { IDeleteCommentDTO } from "@modules/comments/dtos/IDeleteCommentDTO";
import { IShowCommentDTO } from "@modules/comments/dtos/IShowCommentDTO";

import { ICommentsRepository } from "@modules/comments/repositories/ICommentsRepository";
import { Comment } from "../entities/Comment";
import { connection } from "@shared/infra/knex";

class CommentRepository implements ICommentsRepository {

  public async create({
    user_id,
    class_id,
    content,
    is_anonymous
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment({ user_id, class_id, content, is_anonymous });

    await connection<Comment>("comments").insert(comment);

    return comment;
  }

  public async update({
    id,
    user_id,
    class_id,
    content,
    is_anonymous
  }: IUpdateCommentDTO): Promise<Comment> {
    const aComment = new Comment({ user_id, class_id, content, is_anonymous });

    await connection<Comment>("comments").where('id', '=', id).update(aComment);

    return aComment;
  }
  public async show({
    id
  }: IShowCommentDTO): Promise<Comment[]> {
    const selectedComment = await connection<Comment>("comments").where('id', '=', id);
    return selectedComment;

  }
  public async delete({
    id
  }: IDeleteCommentDTO): Promise<Comment[]> {
    const deletedComment = await connection<Comment>("comments").where('id', '=', id);
    await connection<Comment>("comments").where('id', '=', id).del();
    return deletedComment;
  }
  public async index(): Promise<Comment[]> {
    const comments = await connection<Comment>("comments").select();
    return comments;
  }
}

export { CommentRepository };
