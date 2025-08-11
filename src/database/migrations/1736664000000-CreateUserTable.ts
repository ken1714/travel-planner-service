import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1736664000000 implements MigrationInterface {
  name = 'CreateUserTable1736664000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "email" character varying NOT NULL, 
        "username" character varying NOT NULL, 
        "password" character varying NOT NULL, 
        "firstName" character varying, 
        "lastName" character varying, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_users_email" UNIQUE ("email"), 
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
