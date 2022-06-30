import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateCommentDTO } from "../dtos/IUpdateCommentDTO";
import { Comment } from "../infra/knex/entities/Comment";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

@injectable()
class UpdateCommentService {
    constructor(
        @inject("CommentsRepository")
        private CommentsRepository: ICommentsRepository,
    ) { }

    public async execute({
        id,
        user_id,
        class_id,
        content,
        is_anonymous
    }: IUpdateCommentDTO): Promise<Comment> {

        const Comment = await this.CommentsRepository.update({
            id,
            user_id,
            class_id,
            content,
            is_anonymous
        });

        return Comment;
    }
}

export { UpdateCommentService };