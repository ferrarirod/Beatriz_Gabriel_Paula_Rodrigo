import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IShowOptionDTO } from "../dtos/IShowOptionDTO";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class ShowOptionService {
    constructor(
        @inject("OptionsRepository")
        private OptionsRepository: IOptionsRepository,
    ) { }

    public async execute({
        id,
    }: IShowOptionDTO): Promise<Option[]> {

        const option = await this.OptionsRepository.show({
            id,
        });

        return option;
    }
}

export { ShowOptionService };