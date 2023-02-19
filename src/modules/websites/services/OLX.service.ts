import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { WebSitesInterface } from 'src/interfaces/WebSites.interface';
import { PuppeterConfigs } from 'src/class/Puppeter.class';
import puppeteer from 'puppeteer';

@Injectable()
export class OLXService extends PuppeterConfigs implements WebSitesInterface {
  logger = new Logger(OLXService.name);

  constructor() {
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
        (el) => el.map((value) => value.title)
      );

      const ad_href = await this.page.$$eval(
        'ul#ad-list > li.sc-1fcmfeb-2 > div.sc-12rk7z2-0 > a.sc-12rk7z2-1',
        (el) => el.map((value) => value.href)
      );

      const image = await this.page.$$eval(
        'ul#ad-list > li.sc-1fcmfeb-2 > div.sc-12rk7z2-0 >  a.sc-12rk7z2-1 > div.sc-12rk7z2-2 > div.sc-1ion3fe-0 > div > div.sc-101cdir-0 > img',
        (el) => el.map((value) => value.src)
      );

      const price = await this.page.$$eval(
        'ul#ad-list > li.sc-1fcmfeb-2 > div.sc-12rk7z2-0 >  a.sc-12rk7z2-1 > div.sc-12rk7z2-2 > div.sc-12rk7z2-3 > div.sc-12rk7z2-4 div.sc-12rk7z2-5 > div.sc-12rk7z2-11 > div > div.sc-1kn4z61-0 div.sc-1kn4z61-1 > span',
        (el) => el.map((value) => value.textContent)
      );

      const data = [];

      for (let i = 0; i < titles.length; i++) {
        data.push({
          title: titles[i],
          price: price[i],
          atributtes: '',
          href_annoncements: ad_href[i],
          image_href: image[i],
          provider: 'olx',
        });
      }

      return data;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
