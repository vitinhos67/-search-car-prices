import { Module } from '@nestjs/common';
import { CarModelModel } from 'src/model/Model.entity';
import { WebSiteModule } from '../websites/websites.module';
import { CarService } from './services/car.service';
import { CarBrandModel } from 'src/model/Brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annoncements } from 'src/model/Announcements/Base/Announcements.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CarBrandModel, CarModelModel, Annoncements]),
    WebSiteModule,
  ],
  providers: [CarService],
})
export class CarModule {}
