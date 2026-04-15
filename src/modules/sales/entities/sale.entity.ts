import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Store } from "../../stores/entities/store.entity"

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.id)
  store_id: Store;

  @Column({ unique: true, nullable: true })
  bsaleDocumentId: string;

  @Column()
  totalAmount: number;

  @Column({ nullable: true })
  netAmount: number;

  @Column({ nullable: true })
  taxAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
