import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { PackagesRepositories } from "../repositories/PackagesRepositories";

interface IPackageRequest {
  operation_id: string;
  client_id: string;
  type_note: number;
  quantity_notes: number;
  value: number;
  status: number;
  closed_at?: Date;
}

class PackageService {
  async createNew({
    operation_id,
    client_id,
    quantity_notes,
    type_note,
    value,
    status,
    closed_at,
  }: IPackageRequest) {
    const packagesRepositories = getCustomRepository(PackagesRepositories);

    if (!value) {
      throw new Error("Value invalid");
    }

    const objPackage = packagesRepositories.create({
      operation_id,
      client_id,
      quantity_notes,
      type_note,
      value,
      status,
      closed_at,
    });

    await packagesRepositories.save(objPackage);

    return objPackage;
  }
  async getList() {
    const packagesRepositories = getCustomRepository(PackagesRepositories);
    const listPackages = await packagesRepositories.find({
      relations: ["client"],
      order: { updated_at: "DESC" },
    });
    return classToPlain(listPackages);
  }
}

export { PackageService };
