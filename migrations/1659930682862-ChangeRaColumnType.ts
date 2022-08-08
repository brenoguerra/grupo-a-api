import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class ChangeRaColumnType1659930677749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('students', 'ra', new TableColumn({
      name: 'ra',
      type: 'varchar',
      isNullable: false,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('students', 'ra', new TableColumn({
      name: 'ra',
      type: 'bigint',
      isNullable: false,
    }))
  }
}
