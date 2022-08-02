import { inject, injectable } from "tsyringe";
import { ICommentsRepository } from "../repositories/ICommentsRepository";

interface IRequest{
    class_id: string;
}

@injectable()
class ListCommentsByClassService{

    constructor(
        @inject("CommentsRepository")
        private commentsRepository:ICommentsRepository
    ){}

    public async execute({ class_id }:IRequest){

        const comments = await this.commentsRepository.findByClassId(class_id);

        return comments
    }
}

export { ListCommentsByClassService }