import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Users } from "../../entities/Users";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([
        {
          id_user: uuid(),
          name: "Administrador",
          email: "admin@admin.com",
          password: await hash("123456", 8),
          admin: true,
          identity: null,
          date_birth: null,
          address: null,
          city: null,
          district: null,
          number: null,
          state: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id_user: uuid(),
          name: "Cliente 01",
          email: "cliente@fakeatm.com",
          password: await hash("123456", 8),
          admin: false,
          identity: "11112255834",
          date_birth: "02/11/1987",
          address: "Rua Santa Catarina",
          city: "Vila Velha",
          district: "Soteco",
          number: "745",
          state: "ES",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }
}
