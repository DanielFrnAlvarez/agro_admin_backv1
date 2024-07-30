import { PigState } from 'src/modules/pigs/schema/pig.schema';
import { CreatePigDto } from '../../../dto/create-pig.dto';

export function calculateTotalPrice(value: CreatePigDto): number {
  if (value.pigStage === PigState.Piglet) {
    return value.unitPrice ?? 0;
  } else {
    return (
      (value.weight ?? 0) * (value.unitPrice ?? 0) + (value.slaughterPrice ?? 0)
    );
  }
}
