import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';
import { CaptureSearchersService } from './capture-searchers.service';

import { WebSiteModule } from '../websites/websites.module';
@Module({
  imports: [
    WebSiteModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 3002,
      },
    }),
    BullModule.registerQueue({
      name: 'capture-searchers',
    }),
  ],
  providers: [CaptureSearchersService],
  controllers: [],
  exports: [CaptureSearchersService],
})
export class CaptureSearchersModule {}
