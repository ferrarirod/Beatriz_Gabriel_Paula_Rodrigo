import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowAwardDTO } from "../dtos/IShowAwardDTO";
import { Award } from "../infra/knex/entities/Award";
import { IAwardsRepository } from "../repositories/IAwardsRepository";

@injectable()
class ShowAwardService {
    constructor(
        @inject("AwardsRepository")
        private AwardsRepository: IAwardsRepository,
    ) { }

    public async execute({
        id,
    }: IShowAwardDTO): Promise<Award[]> {

        const award = await this.AwardsRepository.show({
            id,
        });

        return award;
    }
}

export { ShowAwardService };