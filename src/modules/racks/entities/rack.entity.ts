import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from "../../stores/entities/store.entity"

@Entity('racks')
export class Rack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    storeId: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: 'storeId' })
    store: Store;

    @Column({ type: 'varchar'})
    type: string;

    @Column({ type: 'int'})
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}