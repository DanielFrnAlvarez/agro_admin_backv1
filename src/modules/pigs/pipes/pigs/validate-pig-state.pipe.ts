import { Injectable, PipeTransform } from '@nestjs/common';
import { CreatePigDto } from '../../dto/create-pig.dto';
import { validatePigStage } from './utils/validate-pig-stage';
import { calculateTotalPrice } from './utils/calculate-total-price';

@Injectable()
export class ValidatePigStatePipe implements PipeTransform {
  transform(value: CreatePigDto) {
    validatePigStage(value);
    value.totalPrice = calculateTotalPrice(value);

    return value;
  }
}
