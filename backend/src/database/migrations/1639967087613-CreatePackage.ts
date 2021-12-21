import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePackage1639967087613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "packages",
        columns: [
          {
            name: "id_package",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "operation_id",
            type: "uuid",
          },
          {
            name: "client_id",
            type: "uuid",
          },
          {
            name: "type_note",
            type: "char",
            length: "1",
          },
          {
            name: "quantity_notes",
            type: "char",
            length: "2",
          },
          {
            name: "value",
            type: "decimal",
            length: "5",
          },
          {
            name: "status",
            type: "char",
            length: "1",
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
          {
            name: "closed_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKPackageOperations",
            referencedTableName: "operations",
            referencedColumnNames: ["id_operation"],
            columnNames: ["operation_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKPackageUsers",
            referencedTableName: "users",
            referencedColumnNames: ["id_user"],
            columnNames: ["client_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("packages");
  }
}
