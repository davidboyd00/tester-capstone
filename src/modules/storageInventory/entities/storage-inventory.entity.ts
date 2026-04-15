import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from "../../products/entities/product.entity"
import { Store } from "../../stores/entities/store.entity"

@Entity('storage_inventory')
export class StorageInventory {
    @PrimaryColumn({ type: 'int'})
    productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @PrimaryColumn({ type: 'int' })
    storeId: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @Column({ type: 'int' })
    numSack: number;

    @Column({ type: 'int' })
    openSack: number;

    @Column({type:'varchar'})
    colourSack: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}