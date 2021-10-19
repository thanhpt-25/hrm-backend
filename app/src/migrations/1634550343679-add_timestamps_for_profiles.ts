import {MigrationInterface, QueryRunner} from "typeorm";

export class addTimestampsForProfiles1634550343679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD COLUMN "created_at" DATE default NULL `);

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "created_at"`);
    }

}
