import { Module } from '@nestjs/common';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { AnnoncementsService } from './annoncements.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnoncementsModel])
  ],
  providers: [AnnoncementsService],
  exports: [AnnoncementsService],
})
export class AnnoncementsModule {}
