import { BadGatewayException, Injectable } from '@nestjs/common';

import { CaptureSearchersService } from 'src/modules/capture-searchers/capture-searchers.service';

import { CarInterface } from '../../car/interface/car.interface';
import { CacheService } from 'src/services/Cache.service';

@Injectable()
export class SearchService {
  constructor(
    private captureSearchers: CaptureSearchersService,
    private cacheService: CacheService
  ) {}

  async search(query: string): Promise<CarInterface[] | unknown> {
    try {
      if (!query) {
        throw new BadGatewayException('Error');
      }
      /**
       *  Validar se eu tenho os dados no banco de dados sobre os carros
       *
       *  se nao adiciona na fila para reconhecer os dados
       *
       */

      return await this.captureSearchers.addValueInQueue(query);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
