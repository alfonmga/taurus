import {MigrationInterface, QueryRunner} from "typeorm";

export class addOptionalUserDisplay1600508557336 implements MigrationInterface {
    name = 'addOptionalUserDisplay1600508557336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "displayName" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "displayName"`);
    }

}
