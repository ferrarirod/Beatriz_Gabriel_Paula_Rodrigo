import { CreateUserService } from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, cpf, name, password, type } = request.body;
    
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      cpf,
      name,
      password,
      type,
    });

    return response.json(user);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
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
