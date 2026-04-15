import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStores1776213324062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `CREATE TABLE Sales(
            id int PRIMARY KEY,
            name varchar(255) NOT NULL,
            bsaleOfficeId int,
            city varchar(255) NOT NULL,
            municipality varchar(255),
            address varchar(255) NOT NULL,
            email varchar(255),
            attentionType varchar(255) NOT NULL,
            cluster varchar(255),
            isActive boolean, 
            createdAt timestamp,
            updatedAt timestamp,
            );`
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
