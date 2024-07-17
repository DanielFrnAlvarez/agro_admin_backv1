import { Body, Controller, Post } from '@nestjs/common';
import { PigsService } from './pigs.service';
import { CreatePigDto } from './dto/create-pig.dto';

@Controller('Pigs')
export class PigsController {
  constructor(private readonly pigsService: PigsService) {}

  @Post()
  async createPig(@Body() createPigDto: CreatePigDto) {
    return this.pigsService.createPig(createPigDto);
  }
}
