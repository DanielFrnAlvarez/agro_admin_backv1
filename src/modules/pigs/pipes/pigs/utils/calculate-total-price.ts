import { CreatePigDto } from '../../../dto/create-pig.dto';

export function calculateTotalPrice(value: CreatePigDto): number {
  return (
    (value.weight ?? 0) * (value.unitPrice ?? 0) + (value.slaughterPrice ?? 0)
  );
}
