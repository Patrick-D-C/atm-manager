import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { OperationService } from "../services/OperationService";

class OperationController {
  async create(request: Request, response: Response) {
    const { parent_id, value, pref_note, status } = request.body;

    const opService = new OperationService();

    const operation = await opService.createNew({
      parent_id,
      client_id: request.id_user,
      value,
      pref_note,
      status,
    });
    return response.json(operation);
  }

  async list(request: Request, response: Response) {
    const { id_user } = request;

    const userRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await userRepositories.findOne(id_user);
    const opService = new OperationService();
    const listOperations = await opService.getList(id_user, admin);
    return response.json(listOperations);
  }

  async find(request: Request, response: Response) {
    const { id_operation } = request.body;
    const opService = new OperationService();
    const operation = await opService.find({ id_operation });

    return response.json(operation);
  }
  async delete(request: Request, response: Response) {
    const { id_operation } = request.params;
    const opService = new OperationService();
    const operation = await opService.delete(id_operation);

    return response.json(operation);
  }
}

export { OperationController };
