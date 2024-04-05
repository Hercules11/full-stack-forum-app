import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeThreadsBodyLenghLimit1712033037848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(
									`ALTER TABLE "Threads" ALTER COLUMN "Body" TYPE varchar(25000)`
								);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.query(
									`ALTER TABLE "Threads" ALTER COLUMN "Body" TYPE varchar(2500)`
								);
    }

}
