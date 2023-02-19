import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MercadoLivreService } from './services/MercadoLivre.service';
import { AnnoncementsInterface } from '../../interfaces/Annoucements.interface';
import { Model } from 'mongoose';
import { OLXService } from './services/OLX.service';
@Injectable()
export class WebsitesService {
  constructor(
    @InjectModel('announcements') private adModel: Model<AnnoncementsInterface>,
    private mercadoLivreService: MercadoLivreService,
    private OlxService: OLXService
  ) {}

  async loadAllWebSitesServices(value: string): Promise<any[] | void> {
    try {
      const mercadolivre = await this.mercadoLivreService.load(value);
      const olx = await this.OlxService.load(value);

      const data = [...mercadolivre, ...olx];

      const announcementsSaved = await this.saveAnnouncements(data);

      return announcementsSaved;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async saveAnnouncements(data: any[]) {
    try {
      const responses = data.map(async (ad) => {
        return await this.adModel.create(ad);
      });

      const datasPromiseDB = Promise.all(responses);

      return datasPromiseDB;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
