import { inject, injectable } from "tsyringe";
import { IFinishedClassesRepository } from "../repositories/IFinishedClassesRepository";

interface IRequest{
    user_id: string;
}


@injectable()
class ListFinishedClassesByUserService{

    constructor(
        @inject("FinishedClassesRepository")
        private finishedClassesRepository: IFinishedClassesRepository,
    ){}

    public async execute ({ user_id}:IRequest){

        const finishedClasses = await this.finishedClassesRepository.findByUser({ user_id })

        return finishedClasses
    }
}

export { ListFinishedClassesByUserService }