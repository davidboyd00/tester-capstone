import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import databaseConfig from './config/database.config';
import bsaleConfig from './config/bsale.config';
import jwtConfig from './config/jwt.config';

import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/stores.module';
import { SalesModule } from './modules/sales/sales.module';
import { ProductsRackModule } from './modules/products-racks/products-rack.module';
import { RacksModule } from './modules/racks/racks.module';
import { StorageInventoryModule } from './modules/storageInventory/storage-inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, bsaleConfig, jwtConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') === 'development',
        logging: config.get('NODE_ENV') === 'development' ? ['error'] : false,
      }),
    }),

    ScheduleModule.forRoot(),

    // Modulos activos
    AuthModule,
    StoresModule,
    SalesModule,
    ProductsRackModule,
    RacksModule,
    StorageInventoryModule,

    // TODO B1: descomentar cuando esten listos
    // BsaleSyncModule,
    // GoalsModule,

    // TODO B2: descomentar cuando esten listos
    // InventoryModule,
    // ReplenishmentModule,

    // TODO B3: descomentar cuando esten listos
    // FormsModule,
    // ReportsModule,
  ],
})
export class AppModule {}
