import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class IndexOptionService {
    constructor(
        @inject("OptionsRepository")
        private OptionsRepository: IOptionsRepository,
    ) { }

    public async execute(): Promise<Option[]> {

        const options = await this.OptionsRepository.index();

        return options;
    }
}

export { IndexOptionService };