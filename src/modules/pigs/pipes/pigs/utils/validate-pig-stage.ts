import { BadRequestException } from '@nestjs/common';
import { PigState } from '../../../schema/pig.schema';
import { CreatePigDto } from '../../../dto/create-pig.dto';

export function validatePigStage(value: CreatePigDto): void {
  if (
    value.pigStage === PigState.Piglet &&
    (value.weight !== undefined || value.slaughterPrice !== undefined)
  ) {
    throw new BadRequestException(
      'When pigStage is "Piglet", weight and slaughterPrice must be undefined.',
    );
  }
}
