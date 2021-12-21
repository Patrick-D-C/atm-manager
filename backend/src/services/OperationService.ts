import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { OperationsRepositories } from "../repositories/OperationsRepositories";
import { PackageService } from "./PackageService";

interface IOperationRequest {
  parent_id?: string;
  client_id: string;
  value: number;
  pref_note?: number;
  status?: number;
}

const notes = [0, 10, 50, 100];

class OperationService {
  async createNew({
    parent_id,
    client_id,
    value,
    pref_note,
    status,
  }: IOperationRequest) {
    const operationsRepositories = getCustomRepository(OperationsRepositories);

    if (!value) {
      throw new Error("Value invalid");
    }
    const packageService = new PackageService();

    const valorRecebido = value;

    var nota = pref_note != 0 ? notes[pref_note] : notes[3];

    //amount = notas
    //over = sobras
    const arraySeparacao = this.calcPacotes(value, nota);

    var amount = arraySeparacao.amount;
    var over = arraySeparacao.over;

    //Se qtdeNotas > 50 ou sobra > 0
    if (amount > 50 || over > 0) {
      //Cria Op pai sem pacote
      const operation = operationsRepositories.create({
        client_id,
        value,
        pref_note: pref_note,
        status: 1,
      });
      await operationsRepositories.save(operation);
      for (var valorRetirado = 0; valorRetirado < valorRecebido; ) {
        //Se qtdeNotas > 50
        if (amount > 50) {
          //Descobre quantos pacotes e op serão necessarias para cobrir
          var rounds = Math.trunc(amount / 50);
          //Percorre ate que o valor de I seja maior que qtde a ser criada
          for (var i = 0; i < rounds; i++) {
            const operationChild = operationsRepositories.create({
              parent_id: operation.id_operation,
              client_id,
              value: 50 * nota,
              pref_note: pref_note,
              status: 3,
            });
            await operationsRepositories.save(operationChild);
            await packageService.createNew({
              client_id,
              operation_id: operationChild.id_operation,
              quantity_notes: 50,
              type_note: pref_note,
              value: 50 * nota,
              status: 2,
            });
            amount = amount - 50;
            valorRetirado = valorRetirado + 50 * nota;
          }
        }
        //Verifica se a quantidade total de notas foi divida
        //Se ainda restar e for menor que 50
        if (amount > 0 && amount < 50) {
          const operationChildLast = operationsRepositories.create({
            parent_id: operation.id_operation,
            client_id,
            value: amount * nota,
            pref_note: pref_note != 0 ? pref_note : 3,
            status: amount < 50 ? 2 : 3,
          });
          await operationsRepositories.save(operationChildLast);
          await packageService.createNew({
            client_id,
            operation_id: operationChildLast.id_operation,
            quantity_notes: amount,
            type_note: pref_note != 0 ? pref_note : 3,
            value: amount * nota,
            status: 1,
          });
          valorRetirado = valorRetirado + amount * nota;
        }
        //Se sobras > 0
        if (over > 0) {
          if (pref_note > 1) {
            pref_note = pref_note - 1;
          } else if (pref_note == 0) {
            pref_note = 2;
          }
          nota = notes[pref_note];
          const arraySeparacao = this.calcPacotes(over, nota);
          amount = arraySeparacao.amount;
          over = arraySeparacao.over;
        }
      }
    } else {
      //Se não
      //Cria operação e adiciona ao pacote
      const operation = operationsRepositories.create({
        client_id,
        value,
        pref_note: pref_note,
        status: amount < 50 ? 2 : 3,
      });
      await operationsRepositories.save(operation);
      await packageService.createNew({
        client_id,
        operation_id: operation.id_operation,
        quantity_notes: amount,
        type_note: pref_note,
        value: amount * 100,
        // 1 Aberto || 2 Fechado
        status: amount < 50 ? 1 : 2,
      });
    }
    return true;
  }

  // Recebe valor total e a nota para fazer o calculo
  // @return total de notas e valor que sobrou
  calcPacotes(value: number, note: number) {
    const amount = Math.trunc(value / note),
      over = value % 100;
    return {
      amount,
      over,
    };
  }

  async getList(client_id, isAdmin) {
    const operationsRepositories = getCustomRepository(OperationsRepositories);
    let parmsWhere = {};
    if (isAdmin) {
      parmsWhere = {
        parent_id: null,
      };
    } else {
      parmsWhere = {
        client_id: client_id,
        parent_id: null,
      };
    }
    const operations = await operationsRepositories.find({
      where: parmsWhere,
      relations: ["client", "children_operation", "packages"],
      order: { updated_at: "DESC" },
    });
    return classToPlain(operations);
  }

  async find({ id_operation }) {
    const operationsRepositories = getCustomRepository(OperationsRepositories);

    const operation = operationsRepositories.findOne(id_operation);

    if (!operation) {
      throw new Error("Operation not found");
    }
    return operation;
  }

  async delete(id_operation) {
    const operationsRepositories = getCustomRepository(OperationsRepositories);

    const operation = operationsRepositories.delete(id_operation);

    if (!operation) {
      throw new Error("Operation not found");
    }
    return operation;
  }
}

export { OperationService };
