import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUserDisplayNameRequired1600512153768 implements MigrationInterface {
    name = 'makeUserDisplayNameRequired1600512153768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" DROP NOT NULL`);
    }

}
