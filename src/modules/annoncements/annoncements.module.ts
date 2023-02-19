import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnoncementsSchema } from 'src/model/Announcements.Schema';
import { AnnoncementsService } from './annoncements.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'announcements', schema: AnnoncementsSchema },
    ]),
  ],
  providers: [AnnoncementsService],
  exports: [AnnoncementsService],
})
export class AnnoncementsModule {}
