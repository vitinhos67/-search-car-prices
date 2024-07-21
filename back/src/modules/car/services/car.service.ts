// Retorna as pesquisas dos carros com o intuito de deletar, encontrar, atualizar, criar
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from 'mongoose';
import {
  AnnoncementsInterface,
  statusAD,
} from 'src/interfaces/Annoucements.interface';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { CarBrandModel } from 'src/model/Brand.entity';
import { CarModelModel } from 'src/model/Model.entity';
import { WebsitesService } from 'src/modules/websites/websites.service';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(
    @InjectRepository(CarBrandModel) private readonly brandsModel: Repository<CarBrandModel>,
    @InjectRepository(CarModelModel) private readonly modelModel: Repository<CarModelModel>,
    @InjectRepository(AnnoncementsModel) private readonly announcementesModel: Repository<AnnoncementsModel>,
    private readonly webSitesServices: WebsitesService
  ) {}

  async findInformationsAboutCars() {
    try {
      const findModel = await this.modelModel.findOne({
        where: {
          visited: false,
        }
      });

      const findBrand = await this.brandsModel.findOne({
        where: {
          id : findModel.id_brand,
        },
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
    annoncements: any
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
      await this.modelModel.update(
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
