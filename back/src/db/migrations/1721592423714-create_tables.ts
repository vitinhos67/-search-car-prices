import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1721592423714 implements MigrationInterface {
  name = 'CreateTables1721592423714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`car_model\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`id_brand\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`visited\` tinyint NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`car_brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`visited\` tinyint NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_eb8a7123894a4050ce101e24d8\` (\`brand\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`search\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`annoncements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`attributes\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`href_annoncements\` varchar(255) NOT NULL, \`image_href\` varchar(255) NOT NULL, \`provider\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`annoncementsIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_c31c7e3fc8b0749447087af76db\` FOREIGN KEY (\`annoncementsIdId\`) REFERENCES \`annoncements\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_c31c7e3fc8b0749447087af76db\``
    );
    await queryRunner.query(`DROP TABLE \`tags\``);
    await queryRunner.query(`DROP TABLE \`annoncements\``);
    await queryRunner.query(`DROP TABLE \`car\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_eb8a7123894a4050ce101e24d8\` ON \`car_brand\``
    );
    await queryRunner.query(`DROP TABLE \`car_brand\``);
    await queryRunner.query(`DROP TABLE \`car_model\``);
  }
}
