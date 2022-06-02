import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { routes } from "./routes";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof Error) {
      app.use(
        (
          error: Error,
          request: Request,
          response: Response,
          _: NextFunction,
        ) => {
          if (error instanceof AppError) {
            console.log("------------------------------");
            console.log("Novo erro no sistema:", error);
            console.log("URL:", request.url);
            console.log("------------------------------");

            return response.status(error.statusCode).json({
              status: "error",
              message: error.message,
            });
          }
          console.log(error);
          return response.status(500).json({
            status: "error",
            message: "Internal server error",
          });
        },
      );
      return response.status(500).json({
        status: "error",
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

app.listen(3333, () => {
  console.log("Server is running in port 3333");
});