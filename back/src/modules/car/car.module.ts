import { Module } from '@nestjs/common';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { CarModelModel } from 'src/model/Model.entity';
import { WebSiteModule } from '../websites/websites.module';
import { CarService } from './services/car.service';
import { CarBrandModel } from 'src/model/Brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([CarBrandModel, CarModelModel, AnnoncementsModel]),
    WebSiteModule,
  ],
  providers: [CarService],
})
export class CarModule {}
