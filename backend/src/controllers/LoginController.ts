import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class LoginController {
  async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const userService = new UserService();

    //Realiza a auth
    //Retorna token e usuario
    const auth = await userService.auth({
      email,
      password,
    });

    return response.json(auth);
  }
}

export { LoginController };
