import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  bsaleOfficeId: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  municipality: string;

  @Column()
  address: string;

  @Column({ nullable: true})
  email: string;

  @Column({ default: 'L-V' })
  attentionType: string;

  @Column({nullable: true}) // No puede quedar null en la práctica !!
  cluster: string;

  @Column({ default: true })
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
