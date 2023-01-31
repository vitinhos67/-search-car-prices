import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaptureSearchersService } from 'src/modules/capture-searchers/capture-searchers.service';

import { CarInterface } from '../interface/car.interface';
import { CacheService } from 'src/services/Cache.service';

@Injectable()
export class SearchService {
  constructor(
    private captureSearchers: CaptureSearchersService,
    private cacheService: CacheService,
    @InjectModel('search') private readonly carModel: Model<CarInterface>,
  ) {}

  async search(query): Promise<CarInterface[] | unknown> {
    try {
      let { search } = query;

      search = search.replace('+', ' ');

      const result = await this.searchModel.find({
        search,
      });

      if (result.length === 0) {
        return await this.captureSearchers.addValueInQueue(search);
      }

      return result;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
