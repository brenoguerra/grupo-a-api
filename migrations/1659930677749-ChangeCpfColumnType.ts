import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class ChangeCpfColumnType1659930677749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('students', 'cpf', new TableColumn({
      name: 'cpf',
      type: 'varchar',
      isNullable: false,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('students', 'cpf', new TableColumn({
      name: 'cpf',
      type: 'bigint',
      isNullable: false,
    }))
  }
}
