import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarBrandSchema } from 'src/model/CarBrand.Schema';
import { CarModelSchema } from 'src/model/CarModel.Schema';
import { WebSiteModule } from '../websites/websites.module';
import { CarService } from './services/car.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'brands', schema: CarBrandSchema },
      { name: 'models', schema: CarModelSchema },
    ]),
    WebSiteModule,
  ],
  providers: [CarService],
})
export class CarModule {}
