import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { WebSitesInterface } from 'src/interfaces/WebSites.interface';
import { PuppeterConfigs } from 'src/class/Puppeter.class';
import puppeteer from 'puppeteer';
import { CacheService } from 'src/services/Cache.service';

@Injectable()
export class OLXService extends PuppeterConfigs implements WebSitesInterface {
  logger = new Logger(OLXService.name);

  constructor(private cacheService: CacheService) {
    super();
  }

  async load(search: string): Promise<any> {
    try {
      search = search.replace('-', '%20');

      const uri = `https://www.olx.com.br/brasil?q=${search}`;

      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();

      this.page.goto(uri);

      await this.page.waitForSelector('div#root');

      const titles = await this.page.$$eval(
        'ul#ad-list > li.sc-1fcmfeb-2 > div.sc-12rk7z2-0 > a.sc-12rk7z2-1',
        (el) => el.map((value) => value.title),
      );

      const ad_href = await this.page.$$eval(
        'ul#ad-list > li.sc-1fcmfeb-2 > div.sc-12rk7z2-0 > a.sc-12rk7z2-1',
        (el) => el.map((value) => value.href),
      );

      const data = [];

      for (let i = 0; i < titles.length; i++) {
        data.push({
          title: titles[i],
          ad_href: ad_href[i],
        });
      }
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
