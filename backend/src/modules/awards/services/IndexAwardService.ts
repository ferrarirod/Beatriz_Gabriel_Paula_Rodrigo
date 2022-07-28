import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Award } from "../infra/knex/entities/Award";
import { IAwardsRepository } from "../repositories/IAwardsRepository";

@injectable()
class IndexAwardService {
    constructor(
        @inject("AwardsRepository")
        private AwardsRepository: IAwardsRepository,
    ) { }

    public async execute(): Promise<Award[]> {

        const awards = await this.AwardsRepository.index();

        return awards;
    }
}

export { IndexAwardService };