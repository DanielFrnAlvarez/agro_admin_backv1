import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PigsService } from './pigs.service';
import { CreatePigDto } from './dto/create-pig.dto';
import { ValidatePigStatePipe } from './pipes/pigs/validate-pig-state.pipe';

@Controller('Pigs')
export class PigsController {
  constructor(private readonly pigsService: PigsService) {}

  @Post()
  @UsePipes(ValidatePigStatePipe)
  async createPig(@Body() createPigDto: CreatePigDto) {
    return this.pigsService.createPig(createPigDto);
  }
}
