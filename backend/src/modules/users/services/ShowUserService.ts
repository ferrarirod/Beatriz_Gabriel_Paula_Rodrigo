import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest) {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export { ShowUserService };
