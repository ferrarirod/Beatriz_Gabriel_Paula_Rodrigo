import { ICreateFinishedClassesDTO } from "@modules/finishedClasses/dtos/ICreateFinishedClassesDTO";
import { IFinishedClassesRepository } from "@modules/finishedClasses/repositories/IFinishedClassesRepository";
import { FinishedClass } from "../entities/FinishedClass";

import { connection } from "@shared/infra/knex";
import { IListFinishedClassesByUserDTO } from "@modules/finishedClasses/dtos/IListFinishedClassesByUserDTO";
class FinishedClassesRepository implements IFinishedClassesRepository {
  public async countByUser(user_id: string): Promise<number> {
    const finishedClasses = await connection<FinishedClass>("finished_classes")
      .where({
        user_id,
      })
      .count({ count: "*" });

    return Number(finishedClasses[0].count);
  }
  public async finByClassId(
    class_id: string
  ): Promise<FinishedClass | undefined> {
    const finishedClasses = await connection<FinishedClass>("finished_classes")
      .where({
        class_id,
      })
      .select()
      .limit(1);

    return finishedClasses[0];
  }
  public async create({
    user_id,
    class_id,
  }: ICreateFinishedClassesDTO): Promise<FinishedClass> {
    const finishedClasses = new FinishedClass({ user_id, class_id });

    await connection<FinishedClass>("finished_classes").insert(finishedClasses);

    return finishedClasses;
  }
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
    const finishedClasses = await connection<FinishedClass>("finished_classes")
      .where({
        user_id,
        class_id
      })
      .select()
      .limit(1);

    return finishedClasses[0];
  }
}

export { FinishedClassesRepository };
