import { CreateUserService } from "@modules/users/services/CreateUserService";
import { DeleteUserService } from "@modules/users/services/DeleteUserService";
import { ListUsersService } from "@modules/users/services/ListUsersService";
import { ShowUserService } from "@modules/users/services/ShowUserService";
import { UpdateUserService } from "@modules/users/services/UpdateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, cpf, name, password, type } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      email,
      cpf,
      name,
      password,
      type,
    });

    return response.status(204).json({});
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return response.json(users);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({
      id,
    });

    return response.json(user);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { email, cpf, name, password, type, score } = request.body;
    
    const { id } = request.params;

    const updateUserService = container.resolve(UpdateUserService);

    console.log(score)
    await updateUserService.execute({
      id,
      email,
      cpf,
      name,
      password,
      type,
      score
    });
    return response.status(204).json({});
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.status(204).json({});
  }
}

export { UsersController };
