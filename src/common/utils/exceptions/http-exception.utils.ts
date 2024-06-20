import { HttpException } from '@nestjs/common';

export function throwHttpException(message: string, statusCode: number = 404): never {
  throw new HttpException(message, statusCode);
}
