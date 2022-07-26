import { ICreateCommentDTO } from "@modules/comments/dtos/ICreateCommentDTO";
import { IUpdateCommentDTO } from "@modules/comments/dtos/IUpdateCommentDTO";
import { IDeleteCommentDTO } from "@modules/comments/dtos/IDeleteCommentDTO";
import { IShowCommentDTO } from "@modules/comments/dtos/IShowCommentDTO";


import { Comment } from "../infra/knex/entities/Comment";

export interface ICommentsRepository {
    create(data: ICreateCommentDTO): Promise<Comment>;
    update(data: IUpdateCommentDTO): Promise<Comment>;
    delete(data: IDeleteCommentDTO): Promise<Comment[]>;
    show(data: IShowCommentDTO): Promise<Comment[]>;
    index(): Promise<Comment[]>;

}