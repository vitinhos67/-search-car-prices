import { Module } from '@nestjs/common';
import { CacheService } from 'src/services/Cache.service';

import { MercadoLivreService } from './services/MercadoLivre.service';
import { WebsitesService } from './websites.service';

@Module({
  imports: [],
  providers: [WebsitesService, MercadoLivreService, CacheService],
  exports: [WebsitesService, MercadoLivreService],
})
export class WebSiteModule {}
