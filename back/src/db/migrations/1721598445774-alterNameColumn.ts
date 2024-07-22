import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterNameColumn1721598445774 implements MigrationInterface {
  name = 'AlterNameColumn1721598445774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_c31c7e3fc8b0749447087af76db\``
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` CHANGE \`annoncementsIdId\` \`annoncementsId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_126997eaef99cb5bb53206deef5\` FOREIGN KEY (\`annoncementsId\`) REFERENCES \`annoncements\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_126997eaef99cb5bb53206deef5\``
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` CHANGE \`annoncementsId\` \`annoncementsIdId\` int NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_c31c7e3fc8b0749447087af76db\` FOREIGN KEY (\`annoncementsIdId\`) REFERENCES \`annoncements\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
