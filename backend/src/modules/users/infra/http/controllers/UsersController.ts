import { CreateUserService } from "@modules/users/services/CreateUserService";
import { ListUsersService } from "@modules/users/services/ListUsersService";
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
    return response.json();
  }
  public async update(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export { UsersController };
