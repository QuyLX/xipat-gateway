import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteRole1648177944461 implements MigrationInterface {
    name = 'deleteRole1648177944461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
    }

}
