import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rack } from '../../racks/entities/rack.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('products_racks')
export class ProductsRack {
    @PrimaryColumn({ type: 'int'})
    rackId: number;

    @ManyToOne(() => Rack)
    @JoinColumn({ name: 'rackId' })
    rack: Rack;

    @PrimaryColumn({ type: 'int' })
    productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column({ type: 'int' })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}