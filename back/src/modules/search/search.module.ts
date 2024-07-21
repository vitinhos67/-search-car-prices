import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchController } from './search.controller';

import { CaptureSearchersModule } from '../capture-searchers/capture-searchers.module';
import { CacheService } from 'src/services/Cache.service';
import { CarModule } from '../car/car.module';

import { AnnoncementsModule } from '../annoncements/annoncements.module';

@Module({
  imports: [AnnoncementsModule, CaptureSearchersModule, CarModule],
  providers: [SearchService, CacheService],
  controllers: [SearchController],
})
export class SearchModule {}
