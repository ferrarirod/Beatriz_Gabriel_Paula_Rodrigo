import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateManyOptionsDTO } from "../dtos/ICreateManyOptionsDTO";
import { ICreateOptionDTO } from "../dtos/ICreateOptionDTO";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class CreateManyOptionsService {
  constructor(
    @inject("OptionsRepository")
    private OptionsRepository: IOptionsRepository
  ) {}

  public async execute({
    options,
    question_id,
  }: ICreateManyOptionsDTO): Promise<Option[]> {
    const createdOptions = [];

    for (var i = 0; i < options.length; i++) {
      let option = await this.OptionsRepository.create({
        name: options[i].name,
        question_id,
      });
      createdOptions.push(option);
    }

    return createdOptions;
  }
}

export { CreateManyOptionsService };
