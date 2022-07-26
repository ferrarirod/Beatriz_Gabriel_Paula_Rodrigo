import { ICreateFinishedClassesDTO } from "../dtos/ICreateFinishedClassesDTO";
import { IListFinishedClassesByUserDTO } from "../dtos/IListFinishedClassesByUserDTO";
import { FinishedClass } from "../infra/knex/entities/FinishedClass";

interface IFinishedClassesRepository {
  findOneByUserAndClass(
    data: ICreateFinishedClassesDTO
  ): Promise<FinishedClass | undefined>;
  findByUser(data: IListFinishedClassesByUserDTO): Promise<FinishedClass[]>;
}

export { IFinishedClassesRepository };
