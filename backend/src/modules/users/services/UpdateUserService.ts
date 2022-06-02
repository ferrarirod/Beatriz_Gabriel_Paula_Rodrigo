import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";




@injectable()
class UpdateUserService{

    constructor(
        @inject("UsersRepository")
        private usersRpository: IUsersRepository
    ){}

    public async execute(){
        
    }
}

export { UpdateUserService };