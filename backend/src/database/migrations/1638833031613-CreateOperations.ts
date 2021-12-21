import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOperations1638833031613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "operations",
        columns: [
          {
            name: "id_operation",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "parent_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "client_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "decimal",
            length: "5",
          },
          {
            name: "pref_note",
            type: "char",
            length: "1",
            isNullable: true,
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
        ],
        foreignKeys: [
          {
            name: "FKOperationsParentOperations",
            referencedTableName: "operations",
            referencedColumnNames: ["id_operation"],
            columnNames: ["parent_id"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUsersOperations",
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
    await queryRunner.dropTable("operations");
  }
}
