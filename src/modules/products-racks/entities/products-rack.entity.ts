import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products_racks')
export class ProductsRack {
    @PrimaryColumn({ type: 'int'})
    rackId: number;

    @PrimaryColumn({ type: 'int' })
    productId: number;

    @Column({ type: 'int' })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}