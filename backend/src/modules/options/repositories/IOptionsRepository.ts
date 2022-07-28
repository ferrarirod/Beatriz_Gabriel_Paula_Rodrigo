import { ICreateOptionDTO } from "@modules/options/dtos/ICreateOptionDTO";
import { IUpdateOptionDTO } from "@modules/options/dtos/IUpdateOptionDTO";
import { IDeleteOptionDTO } from "@modules/options/dtos/IDeleteOptionDTO";
import { IShowOptionDTO } from "@modules/options/dtos/IShowOptionDTO";


import { Option } from "../infra/knex/entities/Option";

export interface IOptionsRepository {
    create(data: ICreateOptionDTO): Promise<Option>;
    update(data: IUpdateOptionDTO): Promise<Option>;
    delete(data: IDeleteOptionDTO): Promise<Option[]>;
    show(data: IShowOptionDTO): Promise<Option[]>;
    index(): Promise<Option[]>;

}