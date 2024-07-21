import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';
import { CaptureSearchersModule } from './modules/capture-searchers/capture-searchers.module';
import { SearchModule } from './modules/search/search.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CarModule } from './modules/car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    ScheduleModule.forRoot(),
    SearchModule,
    CaptureSearchersModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
