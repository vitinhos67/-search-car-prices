import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from 'src/model/Search.Schema';

import { CaptureSearchersModule } from '../capture-searchers/capture-searchers.module';
import { CacheService } from 'src/services/Cache.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    CaptureSearchersModule,
  ],
  providers: [SearchService, CacheService],
  controllers: [SearchController],
})
export class SearchModule {}
