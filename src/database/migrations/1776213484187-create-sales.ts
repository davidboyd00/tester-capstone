import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSales1776213484187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `CREATE TABLE Sales(
            id int PRIMARY KEY,
            CONSTRAINT store_id
            FOREIGN KEY (id)
            REFERENCES Stores(id),
            bsaleDocumentId int,
            totalAmount int NOT NULL,
            netAmount int,
            taxAmount int, 
            createdAt timestamp,
            updatedAt timestamp,
            );`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
