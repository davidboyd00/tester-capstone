import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryAndRacks1776280000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE "storage_inventory" (
                "productId" integer NOT NULL,
                "storeId" integer NOT NULL,
                "openSack" integer NOT NULL,
                "colourSack" character varying NOT NULL,
                "createdAt" timestamp DEFAULT now(),
                "updatedAt" timestamp DEFAULT now(),
                PRIMARY KEY ("productId", "storeId"),
                CONSTRAINT "FK_storage_inventory_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_storage_inventory_store" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "racks" (
                "id" SERIAL PRIMARY KEY,
                "storeId" integer NOT NULL,
                "type" character varying NOT NULL,
                "size" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "FK_racks_store" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products_racks" (
                "rackId" integer NOT NULL,
                "productId" integer NOT NULL,
                "quantity" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                PRIMARY KEY ("rackId", "productId"),
                CONSTRAINT "FK_products_racks_rack" FOREIGN KEY ("rackId") REFERENCES "racks"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_products_racks_product" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products_racks"`);
        await queryRunner.query(`DROP TABLE "racks"`);
        await queryRunner.query(`DROP TABLE "storage_inventory"`);
    }
}