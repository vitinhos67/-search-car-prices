import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { CaptureSearchersModule } from '../capture-searchers/capture-searchers.module';
import { SearchModule } from '../search/search.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI_STRING),
    SearchModule,
    CaptureSearchersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
