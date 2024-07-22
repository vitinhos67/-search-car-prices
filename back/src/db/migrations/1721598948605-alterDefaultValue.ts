import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDefaultValue1721598948605 implements MigrationInterface {
  name = 'AlterDefaultValue1721598948605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`annoncements\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'ACTIVE'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`annoncements\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`
    );
  }
}
