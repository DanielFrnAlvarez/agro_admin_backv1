import { Injectable } from '@nestjs/common';
import { Pig } from 'src/modules/pigs/schema/pig.schema';

@Injectable()
export class CalculateTotalValueService {
  calculateTotalValue(pigList: Pig[]): number {
    return pigList.reduce((total, pig) => total + pig.totalPrice, 0);
  }
}
