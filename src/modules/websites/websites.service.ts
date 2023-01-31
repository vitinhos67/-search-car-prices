import { BadGatewayException, Injectable } from '@nestjs/common';
import { MercadoLivreService } from './services/MercadoLivre.service';

@Injectable()
export class WebsitesService {
  constructor(private mercadoLivreService: MercadoLivreService) {}

  async loadAllWebSitesServices(value): Promise<any[]> {
    try {
      const mercadolivre = await this.mercadoLivreService.load(value);
      return mercadolivre;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
