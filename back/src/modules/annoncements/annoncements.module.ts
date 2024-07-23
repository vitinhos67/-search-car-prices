import { Module } from '@nestjs/common';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { AnnoncementsService } from './annoncements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncementsController } from './annoucements.controller';
import { AnnoncementsSpecificationsModel } from 'src/model/Car/Car.specifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnoncementsModel, AnnoncementsSpecificationsModel])],
  providers: [AnnoncementsService],
  exports: [AnnoncementsService],
  controllers: [AnnoncementsController],
})
export class AnnoncementsModule {}
