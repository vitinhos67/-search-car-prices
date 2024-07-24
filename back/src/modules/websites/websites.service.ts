import { BadGatewayException, Injectable } from '@nestjs/common';
import { MercadoLivreService } from './services/MercadoLivre.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annoncements } from 'src/model/Announcements/Base/Announcements.entity';


@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Annoncements)
    private readonly adModel: Repository<Annoncements>,
    private mercadoLivreService: MercadoLivreService
  ) {}

  async loadAllWebSitesServices(value: string): Promise<any> {
    try {
      const mercadolivre = await this.mercadoLivreService.load(value);
      const olx = /* await this.OlxService.load(value) */ [];
      const data = [...mercadolivre, ...olx];

      const announcementsSaved = await this.saveAnnouncements(data);
      return announcementsSaved;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async saveAnnouncements(data: any[]): Promise<any> {
    try {
      const preparedData = data.map((val) => {
        if (!val.href_announcements) {
          val.href_announcements = 'without_href';
        }
        if (!val.image_href) {
          val.image_href = 'without_href';
        }
        return val;
      });

      const result = await this.adModel.insert(preparedData);
      return result;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
