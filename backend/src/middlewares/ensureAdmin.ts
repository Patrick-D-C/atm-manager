import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id_user } = request;

  const userRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await userRepositories.findOne(id_user);

  if (admin) {
    return next();
  }

  return response.status(401).json({ error: "Unauthorized" });
}
