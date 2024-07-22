import { Module } from '@nestjs/common';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { AnnoncementsService } from './annoncements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncementsController } from './annoucements.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnoncementsModel])
  ],
  providers: [AnnoncementsService],
  exports: [AnnoncementsService],
  controllers: [AnnoncementsController]
})
export class AnnoncementsModule {}
