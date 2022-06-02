import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  type: number;
}

class AuthMiddleware {
  public async isAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (request.user.type === 0) {
      return next();
    }

    throw new AppError("This action is unauthorized.", 403);
  }

  public async isAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = verify(token, auth.secret);

      const { id, type } = decoded as ITokenPayload;

      request.user = {
        id,
        type,
      };
      return next();
    } catch (err) {
      throw new AppError("Invalid JWT", 401);
    }
  }
}

export { AuthMiddleware };
