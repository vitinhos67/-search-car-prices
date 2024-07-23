import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnnoncementSpecifications1721608373436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'annoncements_specifications',
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
            name: 'annoncement_id',
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
      'annoncements_specifications',
      new TableForeignKey({
        columnNames: ['annoncement_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'annoncements',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('annoncements_specifications');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('annoncement_id') !== -1
    );
    await queryRunner.dropForeignKey('annoncements_specifications', foreignKey);
    await queryRunner.dropTable('annoncements_specifications');
  }
}
