import { ICreateFinishedClassesDTO } from "../dtos/ICreateFinishedClassesDTO";
import { IListFinishedClassesByUserDTO } from "../dtos/IListFinishedClassesByUserDTO";
import { FinishedClass } from "../infra/knex/entities/FinishedClass";

interface IFinishedClassesRepository {
  findOneByUserAndClass(
    data: ICreateFinishedClassesDTO
  ): Promise<FinishedClass | undefined>;
  findByUser(data: IListFinishedClassesByUserDTO): Promise<FinishedClass[]>;
  countByUser(user_id: string): Promise<number>;
  create(data: ICreateFinishedClassesDTO): Promise<FinishedClass>;
  finByClassId(class_id: string): Promise<FinishedClass | undefined>;
}

export { IFinishedClassesRepository };
