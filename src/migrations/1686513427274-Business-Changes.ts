import { MigrationInterface, QueryRunner } from 'typeorm';

export class BusinessChanges1686513427274 implements MigrationInterface {
    name = 'BusinessChanges1686513427274';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
        await queryRunner.query(
            `ALTER TABLE "post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
        );
        await queryRunner.query(`ALTER TABLE "post" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "post" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(
            `ALTER TABLE "post" ADD "content" character varying(256) NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_9b3ab408235ba7d60345a84f994" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_9b3ab408235ba7d60345a84f994"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
        );
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "content"`);
        await queryRunner.query(
            `ALTER TABLE "post" ADD "content" character varying(4096) NOT NULL`
        );
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
        await queryRunner.query(
            `ALTER TABLE "post" ADD "title" character varying(64) NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL`
        );
    }
}
