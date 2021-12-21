import {EntityRepository, Repository} from "typeorm";
import { Operations } from "../entities/Operations";

@EntityRepository(Operations)
class OperationsRepositories extends Repository<Operations>{}

export {OperationsRepositories};