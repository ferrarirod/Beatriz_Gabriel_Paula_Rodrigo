import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateOptionDTO } from "../dtos/IUpdateOptionDTO";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class UpdateOptionService {
    constructor(
        @inject("OptionsRepository")
        private OptionsRepository: IOptionsRepository,
    ) { }

    public async execute({
        id,
        name,
        question_id
    }: IUpdateOptionDTO): Promise<Option> {

        const option = await this.OptionsRepository.update({
            id,
            name,
            question_id
        });

        return option;
    }
}

export { UpdateOptionService };