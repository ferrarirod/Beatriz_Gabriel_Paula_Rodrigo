import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateAwardDTO } from "../dtos/IUpdateAwardDTO";
import { Award } from "../infra/knex/entities/Award";
import { IAwardsRepository } from "../repositories/IAwardsRepository";

@injectable()
class UpdateAwardService {
    constructor(
        @inject("AwardsRepository")
        private AwardsRepository: IAwardsRepository,
    ) { }

    public async execute({
        id,
        name,
        description, score,
    }: IUpdateAwardDTO): Promise<Award> {

        const award = await this.AwardsRepository.update({
            id,
            name,
            description, score
        });

        return award;
    }
}

export { UpdateAwardService };