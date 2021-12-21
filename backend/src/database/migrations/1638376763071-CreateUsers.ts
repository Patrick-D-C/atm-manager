import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1638376763071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id_user",
            type: "uuid",
            isPrimary: true,
          },         
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "name",
            type: "varchar",
          },          
          {
            name: "identity",
            type: "char",
            length: "11",
            isNullable: true,
          },
          {
            name: "date_birth",
            type: "date",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "number",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "district",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "state",
            type: "char",
            length: "2",
            isNullable: true,
          },
          {
            name: "admin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
