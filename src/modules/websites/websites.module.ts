import { Module } from '@nestjs/common';
import { CacheService } from 'src/services/Cache.service';

import { MercadoLivreService } from './services/MercadoLivre.service';
import { OLXService } from './services/OLX.service';
import { WebsitesService } from './websites.service';

@Module({
  imports: [],
  providers: [WebsitesService, MercadoLivreService, OLXService, CacheService],
  exports: [WebsitesService, MercadoLivreService, OLXService],
})
export class WebSiteModule {}
