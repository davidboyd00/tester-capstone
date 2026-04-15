import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSales1776213484187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sales" (
                "id" SERIAL PRIMARY KEY,
                "store_id" integer NOT NULL, 
                "bsaleDocumentId" integer,
                "totalAmount" integer NOT NULL,
                "netAmount" integer,
                "taxAmount" integer, 
                "createdAt" timestamp DEFAULT now(),
                "updatedAt" timestamp DEFAULT now(),
                CONSTRAINT "FK_sales_store" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}