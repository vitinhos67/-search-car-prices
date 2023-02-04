import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnoncementsSchema } from 'src/model/Announcements.Schema';
import { CarBrandSchema } from 'src/model/CarBrand.Schema';
import { CarModelSchema } from 'src/model/CarModel.Schema';
import { WebSiteModule } from '../websites/websites.module';
import { CarService } from './services/car.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'brands', schema: CarBrandSchema },
      { name: 'models', schema: CarModelSchema },
      { name: 'announcements', schema: AnnoncementsSchema },
    ]),
    WebSiteModule,
  ],
  providers: [CarService],
})
export class CarModule {}
