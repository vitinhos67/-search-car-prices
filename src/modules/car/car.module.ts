import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnoncementsSchema } from 'src/model/Announcements.Schema';
import { CarModelSchema } from 'src/model/Model.Schema';
import { WebSiteModule } from '../websites/websites.module';
import { CarService } from './services/car.service';
import { CarBrandSchema } from 'src/model/Brand.Schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'models', schema: CarModelSchema },
      { name: 'brands', schema: CarBrandSchema },
      { name: 'announcements', schema: AnnoncementsSchema },
    ]),
    WebSiteModule,
  ],
  providers: [CarService],
})
export class CarModule {}
