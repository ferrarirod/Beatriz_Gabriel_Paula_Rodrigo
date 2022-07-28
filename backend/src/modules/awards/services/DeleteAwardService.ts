import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteAwardDTO } from "../dtos/IDeleteAwardDTO";
import { Award } from "../infra/knex/entities/Award";
import { IAwardsRepository } from "../repositories/IAwardsRepository";

@injectable()
class DeleteAwardService {
    constructor(
        @inject("AwardsRepository")
        private AwardsRepository: IAwardsRepository,
    ) { }

    public async execute({
        id,
    }: IDeleteAwardDTO): Promise<Award[]> {

        const award =await this.AwardsRepository.delete({
            id,
        });

        return award;
    }
}

export { DeleteAwardService };