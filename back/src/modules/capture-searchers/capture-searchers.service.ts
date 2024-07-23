import { Injectable } from '@nestjs/common';

import { WebsitesService } from '../websites/websites.service';

@Injectable()
export class CaptureSearchersService {
  constructor(private webSitesServices: WebsitesService) {}

  async addValueInQueue(value: string) {
    return await this.webSitesServices.loadAllWebSitesServices(value);
  }
}
