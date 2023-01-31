import { BadGatewayException, Injectable } from '@nestjs/common';

import { CaptureSearchersService } from 'src/modules/capture-searchers/capture-searchers.service';

import { CarInterface } from '../interface/car.interface';
import { CacheService } from 'src/services/Cache.service';

@Injectable()
export class SearchService {
  constructor(
    private captureSearchers: CaptureSearchersService,
    private cacheService: CacheService,
  ) {}

  async search(query): Promise<CarInterface[] | unknown> {
    try {
      let { search } = query;

      search = search.replace('+', ' ');

      return await this.captureSearchers.addValueInQueue(search);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
