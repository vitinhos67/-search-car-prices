import { Module } from '@nestjs/common';

import { BullModule } from '@nestjs/bull';
import { CaptureSearchersService } from './capture-searchers.service';
import { WebSiteModule } from '../websites/websites.module';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });


@Module({
  imports: [
    WebSiteModule,
    BullModule.forRoot({
      redis: {
        host: `${process.env.REDIS_HOST}`,
        port: Number(`${process.env.REDIS_PORT}`),
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
