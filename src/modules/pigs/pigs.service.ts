import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pig } from './schema/pig.schema';
import { Model } from 'mongoose';
import { CreatePigDto } from './dto/create-pig.dto';

@Injectable()
export class PigsService {
  constructor(@InjectModel(Pig.name) private pigModel: Model<Pig>) {}
  async createPig(createPigDto: CreatePigDto): Promise<Pig> {
    const newPig = new this.pigModel(createPigDto);
    return await newPig.save();
  }
}
