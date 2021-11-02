import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTimestampsForUsers1634550447703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "created_at" DATE default NULL `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "created_at" DATE default NULL `,
    );
  }
}
