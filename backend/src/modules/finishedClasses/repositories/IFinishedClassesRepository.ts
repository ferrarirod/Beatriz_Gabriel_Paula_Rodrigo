import { ICreateFinishedClassesDTO } from "../dtos/ICreateFinishedClassesDTO"
import { FinisedClass } from "../infra/knex/entities/FinishedClass"


interface IFinishedClassesRepository{
    findOneByUserAndClass(data:ICreateFinishedClassesDTO):Promise<FinisedClass | undefined>
}

export { IFinishedClassesRepository }