import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRack } from './entities/products-rack.entity';
import { ProductsRackService } from './products-rack.service';
import { ProductsRackController } from './products-rack.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRack])],
  controllers: [ProductsRackController],
  providers: [ProductsRackService],
  exports: [ProductsRackService],
})
export class ProductsRackModule {}
