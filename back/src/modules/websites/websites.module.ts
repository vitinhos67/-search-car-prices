import { Module } from '@nestjs/common';

import { CacheService } from 'src/services/Cache.service';

import { MercadoLivreService } from './services/MercadoLivre.service';
import { OLXService } from './services/OLX.service';
import { WebsitesService } from './websites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncementsModule } from '../annoncements/annoncements.module';
import { AnnoncementsModel } from 'src/model/Announcements/Base/Announcements.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnoncementsModel]), AnnoncementsModule],
  providers: [WebsitesService, MercadoLivreService, OLXService, CacheService],
  exports: [WebsitesService, MercadoLivreService, OLXService],
})
export class WebSiteModule {}
