import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStores1776213324062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "stores" (
                "id" SERIAL PRIMARY KEY,
                "name" character varying(255) NOT NULL,
                "bsaleOfficeId" integer,
                "city" character varying(255) NOT NULL,
                "municipality" character varying(255),
                "address" character varying(255) NOT NULL,
                "email" character varying(255),
                "attentionType" character varying(255) NOT NULL,
                "cluster" character varying(255),
                "isActive" boolean, 
                "createdAt" timestamp DEFAULT now(),
                "updatedAt" timestamp DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stores"`);
    }
}