import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteCommentDTO } from "../dtos/IDeleteCommentDTO";
import { Comment } from "../infra/knex/entities/Comment";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

@injectable()
class DeleteCommentService {
    constructor(
        @inject("CommentsRepository")
        private CommentsRepository: ICommentsRepository,
    ) { }

    public async execute({
        id,
    }: IDeleteCommentDTO): Promise<Comment[]> {

        const Comment = await this.CommentsRepository.delete({
            id,
        });

        return Comment;
    }
}

export { DeleteCommentService };