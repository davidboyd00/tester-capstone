import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RacksService } from './racks.service';
import { CreateRackDto } from './dto/create-rack.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('racks')
@Controller('racks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RacksController {
    constructor(private readonly racksService: RacksService) {}

    @Post()
    create(@Body() createDto: CreateRackDto) {
        return this.racksService.create(createDto);
    }

    @Get()
    findAll() {
        return this.racksService.findAll();
    }
}