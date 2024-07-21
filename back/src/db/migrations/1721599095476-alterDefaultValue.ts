import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDefaultValue1721599095476 implements MigrationInterface {
    name = 'AlterDefaultValue1721599095476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`price\` \`price\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`href_annoncements\` \`href_annoncements\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`image_href\` \`image_href\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`image_href\` \`image_href\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`href_annoncements\` \`href_annoncements\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`annoncements\` CHANGE \`price\` \`price\` varchar(255) NOT NULL`);
    }

}
