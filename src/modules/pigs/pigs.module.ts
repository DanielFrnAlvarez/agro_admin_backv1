import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PigsService } from './pigs.service';
import { PigsController } from './pigs.controller';
import { Pig, PigSchema } from './schema/pig.schema';
import { ValidatePigStatePipe } from './pipes/pigs/validate-pig-state.pipe';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pig.name, schema: PigSchema }])],
  controllers: [PigsController],
  providers: [PigsService, ValidatePigStatePipe],
})
export class PigsModule {}
