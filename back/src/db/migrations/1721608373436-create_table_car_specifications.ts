import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCarSpecifications1721608373436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car_specifications',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'engine',
            type: 'varchar',
          },
          {
            name: 'transmission',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'fuel_type',
            type: 'varchar',
          },
          {
            name: 'seats',
            type: 'int',
          },
          {
            name: 'doors',
            type: 'int',
          },
          {
            name: 'car_id',
            type: 'int',
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'car_specifications',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'car',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('car_specifications');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('car_id') !== -1
    );
    await queryRunner.dropForeignKey('car_specifications', foreignKey);
    await queryRunner.dropTable('car_specifications');
  }
}
