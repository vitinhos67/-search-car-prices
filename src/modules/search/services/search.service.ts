import { BadGatewayException, Injectable } from '@nestjs/common';
import { CaptureSearchersService } from 'src/modules/capture-searchers/capture-searchers.service';
import { CarInterface } from '../../car/interface/car.interface';
import { AnnoncementsService } from 'src/modules/annoncements/annoncements.service';

@Injectable()
export class SearchService {
  constructor(
    private adService: AnnoncementsService,
    private captureSearchers: CaptureSearchersService
  ) {}

  async search(query: string): Promise<CarInterface[] | unknown> {
    try {
      if (!query) {
        throw new BadGatewayException('Error');
      }

      const response = await this.adService.findAd(query);

      if (response.length) {
        return response;
      }

      return await this.captureSearchers.addValueInQueue(query);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
