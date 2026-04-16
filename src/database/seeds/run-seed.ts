import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Store } from '../../modules/stores/entities/store.entity';
import { User } from '../../modules/auth/entities/user.entity';
import { Sale } from '../../modules/sales/entities/sale.entity';
import { runSeed } from './initial.seed';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'coaniquem',
  password: process.env.DATABASE_PASSWORD || 'coaniquem_dev',
  database: process.env.DATABASE_NAME || 'coaniquem_db',
  entities: [Store, User, Sale],
  synchronize: false,
});

async function main() {
  await dataSource.initialize();
  console.log('Seed: conectado a la base de datos');
  await runSeed(dataSource);
  await dataSource.destroy();
  console.log('Seed: completado');
}

main().catch((err: any) => {
  console.error('Seed: error', err);
  process.exit(1);
});
