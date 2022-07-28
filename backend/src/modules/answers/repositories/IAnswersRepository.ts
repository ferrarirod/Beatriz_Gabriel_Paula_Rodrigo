import { ICreateAnswerDTO } from "../dtos/ICreateAnswerDTO";
import { Answer } from "../infra/knex/entities/Answer";



export interface IAnswersRepository{
    create(data:ICreateAnswerDTO):Promise<Answer>
}