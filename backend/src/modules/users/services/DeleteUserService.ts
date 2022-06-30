import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest) {
    await this.usersRepository.delete(id);
  }
}

export { DeleteUserService };
