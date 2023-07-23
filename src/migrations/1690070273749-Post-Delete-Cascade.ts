import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostDeleteCascade1690070273749 implements MigrationInterface {
    name = 'PostDeleteCascade1690070273749';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_132a5076e5d713b677a675612ff"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_132a5076e5d713b677a675612ff" FOREIGN KEY ("parentPostId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_132a5076e5d713b677a675612ff"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_132a5076e5d713b677a675612ff" FOREIGN KEY ("parentPostId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
