import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StorageInventoryService } from './storage-inventory.service';
import { CreateStorageInventoryDto } from './dto/create-storage-inventory.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('storage-inventory')
@Controller('storage-inventory')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StorageInventoryController {
    constructor(private readonly inventoryService: StorageInventoryService) {}

    @Post()
    create(@Body() createDto: CreateStorageInventoryDto) {
        return this.inventoryService.create(createDto);
    }

    @Get()
    findAll() {
        return this.inventoryService.findAll();
    }
}