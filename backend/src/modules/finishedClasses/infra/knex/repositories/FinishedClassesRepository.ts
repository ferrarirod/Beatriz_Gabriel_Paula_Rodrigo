import { ICreateFinishedClassesDTO } from "@modules/finishedClasses/dtos/ICreateFinishedClassesDTO";
import { IFinishedClassesRepository } from "@modules/finishedClasses/repositories/IFinishedClassesRepository";
import { FinishedClass } from "../entities/FinishedClass";

import { connection } from "@shared/infra/knex";
import { IListFinishedClassesByUserDTO } from "@modules/finishedClasses/dtos/IListFinishedClassesByUserDTO";
class FinishedClassesRepository implements IFinishedClassesRepository {
  public async findByUser({
    user_id,
  }: IListFinishedClassesByUserDTO): Promise<FinishedClass[]> {
    const finishedClasses = await connection<FinishedClass>("finished_classes")
      .where({
        user_id,
      })
      .select();

    return finishedClasses;
  }
  public async findOneByUserAndClass({
    user_id,
    class_id,
  }: ICreateFinishedClassesDTO): Promise<FinishedClass | undefined> {
    const finishedClasses = new FinishedClass({ user_id, class_id });

    await connection<FinishedClass>("finished_classes").insert(finishedClasses);

    return finishedClasses;
  }
}

export { FinishedClassesRepository };
