import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Comment } from "../infra/knex/entities/Comment";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

@injectable()
class IndexCommentService {
    constructor(
        @inject("CommentsRepository")
        private CommentsRepository: ICommentsRepository,
    ) { }

    public async execute(): Promise<Comment[]> {

        const comments = await this.CommentsRepository.index();

        return comments;
    }
}

export { IndexCommentService };