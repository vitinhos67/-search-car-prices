import { Module } from '@nestjs/common';
import { Annoncements } from 'src/model/Announcements/Base/Announcements.entity';
import { AnnoncementsService } from './annoncements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncementsController } from './annoucements.controller';
import { AnnoncementsSpecifications } from 'src/model/Announcements/Announcements.specifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annoncements, AnnoncementsSpecifications])],
  providers: [AnnoncementsService],
  exports: [AnnoncementsService],
  controllers: [AnnoncementsController],
})
export class AnnoncementsModule {}
