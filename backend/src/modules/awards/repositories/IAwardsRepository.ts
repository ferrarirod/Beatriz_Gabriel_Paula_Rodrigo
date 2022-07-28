import { ICreateAwardDTO } from "@modules/awards/dtos/ICreateAwardDTO";
import { IUpdateAwardDTO } from "@modules/awards/dtos/IUpdateAwardDTO";
import { IDeleteAwardDTO } from "@modules/awards/dtos/IDeleteAwardDTO";
import { IShowAwardDTO } from "@modules/awards/dtos/IShowAwardDTO";


import { Award } from "../infra/knex/entities/Award";

export interface IAwardsRepository {
    create(data: ICreateAwardDTO): Promise<Award >;
    update(data: IUpdateAwardDTO): Promise<Award >;
    delete(data: IDeleteAwardDTO): Promise<Award []>;
    show(data: IShowAwardDTO): Promise<Award []>;
    index(): Promise<Award []>;

}