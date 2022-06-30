import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowCommentDTO } from "../dtos/IShowCommentDTO";
import { Comment } from "../infra/knex/entities/Comment";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

@injectable()
class ShowCommentService {
    constructor(
        @inject("CommentsRepository")
        private CommentsRepository: ICommentsRepository,
    ) { }

    public async execute({
        id,
    }: IShowCommentDTO): Promise<Comment[]> {

        const Comment = await this.CommentsRepository.show({
            id,
        });

        return Comment;
    }
}

export { ShowCommentService };