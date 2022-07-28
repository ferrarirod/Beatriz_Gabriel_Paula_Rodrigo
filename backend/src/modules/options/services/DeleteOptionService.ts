import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDeleteOptionDTO } from "../dtos/IDeleteOptionDTO";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class DeleteOptionService {
    constructor(
        @inject("OptionsRepository")
        private OptionsRepository: IOptionsRepository,
    ) { }

    public async execute({
        id,
    }: IDeleteOptionDTO): Promise<Option[]> {

        const option = await this.OptionsRepository.delete({
            id,
        });

        return option;
    }
}

export { DeleteOptionService };