import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateOptionDTO } from "../dtos/ICreateOptionDTO";
import { Option } from "../infra/knex/entities/Option";
import { IOptionsRepository } from "../repositories/IOptionsRepository";

@injectable()
class CreateOptionService {
  constructor(
    @inject("OptionsRepository")
    private OptionsRepository: IOptionsRepository,
  ) { }

  public async execute({
    name,
    description,
    question_id,
    chalenge_id
  }: ICreateOptionDTO): Promise<Option> {

    const option = await this.OptionsRepository.create({
      name,
      description,
      question_id,
      chalenge_id
    });

    return option;
  }
}

export { CreateOptionService };