// Retorna as pesquisas dos carros com o intuito de deletar, encontrar, atualizar, criar
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { BrandInterface } from 'src/interfaces/Brand.interface';
import { ModelInterface } from 'src/interfaces/Model.interface';
import { WebsitesService } from 'src/modules/websites/websites.service';
@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(
    @InjectModel('brands') private readonly brandsModel: Model<BrandInterface>,
    @InjectModel('models') private readonly modelModel: Model<ModelInterface>,
    private readonly webSitesServices: WebsitesService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async FindInformationsAboutCars() {
    try {
      const findModel = await this.modelModel.findOne({
        visited: false,
      });

      const findBrand = await this.brandsModel.findOne({
        id: findModel.id_brand,
      });

      const value = `${findBrand.brand}+${findModel.model}`;

      const added = await this.webSitesServices.loadAllWebSitesServices(value);
    } catch (error) {
      if (error) {
        throw new BadGatewayException(error.message);
      }
    }
  }
}
