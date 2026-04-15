import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoalsAndProducts1776270335514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL PRIMARY KEY,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL,
                "quantity_sack" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "CHK_products_quantity_sack" CHECK ("quantity_sack" >= 0)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "macro_goals" (
                "id" SERIAL PRIMARY KEY,
                "store_id" integer NOT NULL,
                "type" character varying NOT NULL,
                "period" character varying(7) NOT NULL,
                "target_amount" double precision NOT NULL,
                "actual_amount" double precision NOT NULL DEFAULT 0,
                "days_achieved" integer NOT NULL DEFAULT 0,
                "is_achieved" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_macro_goals_store" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "daily_goals" (
                "id" SERIAL PRIMARY KEY,
                "store_id" integer NOT NULL,
                "date" date NOT NULL,
                "target_amount" double precision NOT NULL,
                "actual_amount" double precision NOT NULL DEFAULT 0,
                "is_achieved" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_daily_goals_store" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "daily_goals"`);
        await queryRunner.query(`DROP TABLE "macro_goals"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}