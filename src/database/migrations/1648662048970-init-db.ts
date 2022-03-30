import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1648662048970 implements MigrationInterface {
    name = 'initDb1648662048970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`context\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`level\` varchar(255) NOT NULL, \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`local_file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`filename\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`mimetype\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dictionary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`list_courier_name\` varchar(255) NOT NULL, \`courier_parse\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin', 'partner') NOT NULL DEFAULT 'user', \`plan\` enum ('basic', 'pro', 'enterprise') NOT NULL DEFAULT 'basic', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`pattern\` varchar(255) NOT NULL, \`display_name\` varchar(255) NOT NULL, \`host\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`server\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`courier\` varchar(255) NOT NULL, \`attempt\` varchar(255) NOT NULL, \`status_ping\` varchar(255) NOT NULL, \`time_notify\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`server\``);
        await queryRunner.query(`DROP TABLE \`courier\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`dictionary\``);
        await queryRunner.query(`DROP TABLE \`local_file\``);
        await queryRunner.query(`DROP TABLE \`log\``);
    }

}
