import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnoncementsSchema } from 'src/model/Announcements.Schema';
import { CacheService } from 'src/services/Cache.service';

import { MercadoLivreService } from './services/MercadoLivre.service';
import { OLXService } from './services/OLX.service';
import { WebsitesService } from './websites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'announcements', schema: AnnoncementsSchema },
    ]),
  ],
  providers: [WebsitesService, MercadoLivreService, OLXService, CacheService],
  exports: [WebsitesService, MercadoLivreService, OLXService],
})
export class WebSiteModule {}
