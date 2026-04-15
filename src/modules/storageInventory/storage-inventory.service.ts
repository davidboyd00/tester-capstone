import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageInventory } from './entities/storage-inventory.entity';
import { CreateStorageInventoryDto } from './dto/create-storage-inventory.dto';

@Injectable()
export class StorageInventoryService {
    constructor(
        @InjectRepository(StorageInventory)
        private readonly storageInvRepo: Repository<StorageInventory>,
    ) {}

    async create(createDto: CreateStorageInventoryDto): Promise<StorageInventory> {
        const inventory = this.storageInvRepo.create(createDto);
        return this.storageInvRepo.save(inventory);
    }

    async findAll(): Promise<StorageInventory[]> {
        return this.storageInvRepo.find()
    }
}