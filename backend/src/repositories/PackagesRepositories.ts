import { EntityRepository, Repository } from "typeorm";
import { Packages } from "../entities/Packages";

@EntityRepository(Packages)
class PackagesRepositories extends Repository<Packages> {}

export { PackagesRepositories };
