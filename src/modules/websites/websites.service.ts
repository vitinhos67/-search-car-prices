import { BadGatewayException, Injectable } from '@nestjs/common';
import { MercadoLivreService } from './services/MercadoLivre.service';
import { OLXService } from './services/OLX.service';

@Injectable()
export class WebsitesService {
  constructor(
    private mercadoLivreService: MercadoLivreService,
    private OLXService: OLXService,
  ) {}

  async loadAllWebSitesServices(value: string): Promise<any[] | void> {
    try {
      /*  const mercadolivre = await this.mercadoLivreService.load(value); */
      const olx = await this.OLXService.load(value);

      return;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
