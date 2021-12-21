import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Recebe os dados do Header
  const authToken = request.headers.authorization;

  //verifica se foi preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  //Separa o Bearer do token
  const [, token] = authToken.split(" ");

  //Valida se o token é valido
  try {
    const { sub } = verify(
      token,
      "104c531b108f35e220fce0f4dfe4830e"
    ) as IPayload;

    //Informa o id do usuario logado para os proximos request's
    request.id_user = sub;
    
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
