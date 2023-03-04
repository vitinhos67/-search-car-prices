import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { CaptureSearchersModule } from './modules/capture-searchers/capture-searchers.module';
import { SearchModule } from './modules/search/search.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CarModule } from './modules/car/car.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI_STRING),
    ScheduleModule.forRoot(),
    SearchModule,
    CaptureSearchersModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
