import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageInventory } from './entities/storage-inventory.entity';
import { StorageInventoryService } from './storage-inventory.service';
import { StorageInventoryController } from './storage-inventory.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StorageInventory])],
    controllers: [StorageInventoryController],
    providers: [StorageInventoryService],
    exports: [StorageInventoryService],
})
export class StorageInventoryModule {}