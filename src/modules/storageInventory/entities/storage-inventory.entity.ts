import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('storage_inventory')
export class StorageInventory {
    @PrimaryColumn({ type: 'int'})
    productId: number; // Cuando exista Product: @ManyToOne(() => Product) @JoinColumn({ name: 'productId' }) product: Product;

    @PrimaryColumn({ type: 'int' })
    storeId: number; // Cuando lo relaciones: @ManyToOne(() => Store) @JoinColumn({ name: 'storeId' }) store: Store;

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