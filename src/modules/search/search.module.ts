import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from 'src/model/Search.Schema';

import { CaptureSearchersModule } from '../capture-searchers/capture-searchers.module';
import { CacheService } from 'src/services/Cache.service';
import { CarModule } from '../car/car.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    CaptureSearchersModule,
    CarModule,
  ],
  providers: [SearchService, CacheService],
  controllers: [SearchController],
})
export class SearchModule {}
