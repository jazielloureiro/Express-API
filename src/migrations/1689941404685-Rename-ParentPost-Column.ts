import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameParentPostColumn1689941404685 implements MigrationInterface {
    name = 'RenameParentPostColumn1689941404685';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_9b3ab408235ba7d60345a84f994"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "postId" TO "parentPostId"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_132a5076e5d713b677a675612ff" FOREIGN KEY ("parentPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_132a5076e5d713b677a675612ff"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "parentPostId" TO "postId"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_9b3ab408235ba7d60345a84f994" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
