import { inject, injectable } from "tsyringe";
import { IClassesRepository } from "../repositories/IClassesRepository";

interface IRequest{
    module_id: string;
}

@injectable()
class ListClassesByModuleService{

    constructor(
        @inject("ClassesRepository")
        private classesRepository: IClassesRepository
    ){}

    public async execute({module_id}:IRequest){

        const classes = await this.classesRepository.findByModule(module_id);

        return classes;
    }
}

export { ListClassesByModuleService }