import { Request, Response } from "express";
import { PackageService } from "../services/PackageService";

class PackageController {
  async list(request: Request, response: Response) {
    const { id_user } = request;
    const packageService = new PackageService();
    const listPackages = await packageService.getList();
    return response.json(listPackages);
  }
}

export { PackageController };
