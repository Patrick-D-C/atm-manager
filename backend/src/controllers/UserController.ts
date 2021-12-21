import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    const {
      email,
      password,
      name,
      identity,
      date_birth,
      address,
      number,
      district,
      city,
      state,
      admin,
    } = request.body;

    const userService = new UserService();

    const user = await userService.createNew({
      email,
      password,
      name,
      identity,
      date_birth,
      address,
      number,
      district,
      city,
      state,
      admin,
    });
    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const {
      email,
      password,
      name,
      identity,
      date_birth,
      address,
      number,
      district,
      city,
      state,
      admin,
    } = request.body;
    const { id_user } = request;
    console.log(id_user);
    const userService = new UserService();

    const user = await userService.update({
      id_user,
      email,
      password,
      name,
      identity,
      date_birth,
      address,
      number,
      district,
      city,
      state,
      admin,
    });
    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id_user } = request.params;
    const userService = new UserService();
    const operation = await userService.delete(id_user);

    return response.json(operation);
  }
}

export { UserController };
