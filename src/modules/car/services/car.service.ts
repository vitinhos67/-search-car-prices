// Retorna as pesquisas dos carros com o intuito de deletar, encontrar, atualizar, criar
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import {
  AnnoncementsInterface,
  statusAD,
} from 'src/interfaces/Annoucements.interface';
import { BrandInterface } from 'src/interfaces/Brand.interface';
import { ModelInterface } from 'src/interfaces/Model.interface';
import { WebsitesService } from 'src/modules/websites/websites.service';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(
    @InjectModel('brands') private readonly brandsModel: Model<BrandInterface>,
    @InjectModel('models') private readonly modelModel: Model<ModelInterface>,
    @InjectModel('announcements')
    private announcementesModel: Model<AnnoncementsInterface>,
    private readonly webSitesServices: WebsitesService
  ) {}

  async FindInformationsAboutCars() {
    try {
      const findModel = await this.modelModel.findOne({
        visited: false,
      });

      const findBrand = await this.brandsModel.findOne({
        id: findModel.id_brand,
      });

      const value = `${findBrand.brand}-${findModel.model.replace(' ', '-')}`;

      const annoncements_found = await this.webSitesServices
        .loadAllWebSitesServices(value)
        .catch(async (error) => {
          if (
            error.message.includes('failed to find element matching selector')
          ) {
            await this.updateVisitedModel(findModel.id);
            this.logger.error(error.message);
          }
        });

      await this.addAnnoncements(annoncements_found);
      await this.updateVisitedModel(findModel.id);
    } catch (error) {
      if (error) {
        throw new BadGatewayException(error.message);
      }
    }
  }

  async addAnnoncements(
    annoncements: AnnoncementsInterface[] | void
  ): Promise<void> {
    try {
      if (annoncements) {
        annoncements.forEach(async (element) => {
          const data: AnnoncementsInterface = {
            href_annoncements: element.href_annoncements,
            attributes: element.attributes,
            title: element.title,
            image_href: element.image_href,
            price: element.price,
            status: statusAD.ATIVO,
            provider: element.provider,
          };

          await this.announcementesModel.create(data);
        });
      }
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async updateVisitedModel(idModel: string) {
    try {
      await this.modelModel.updateOne(
        {
          id: idModel,
        },
        {
          visited: true,
        }
      );
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
