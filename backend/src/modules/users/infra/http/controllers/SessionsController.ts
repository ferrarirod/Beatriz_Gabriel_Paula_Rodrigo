import { CreateSessionUserService } from "@modules/users/services/CreateSessionsUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionUserService = container.resolve(
      CreateSessionUserService
    );

    const { user, token } = await createSessionUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { SessionsController };
