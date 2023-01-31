import { BadGatewayException, Injectable } from '@nestjs/common';
import { WebSitesInterface } from 'src/interfaces/WebSites.interface';
import { PuppeterConfigs } from 'src/class/Puppeter.class';

import { CacheService } from 'src/services/Cache.service';

@Injectable()
export class MercadoLivreService
  extends PuppeterConfigs
  implements WebSitesInterface
{
  constructor(private cacheService: CacheService) {
    super();
  }

  async load(value: string): Promise<any> {
    try {
      const uri = 'https://mercadolivre.com.br';
      await this.setConfigPuppeter({
        uri,
      });

      const inputSearchID = '#cb1-edit';
      await this.page.waitForSelector(inputSearchID);

      await this.page.type(inputSearchID, value);
      await this.page.keyboard.press('Enter');
      await this.page.waitForSelector('#root-app');

      const total_ad = await this.page.$eval(
        'span.ui-search-search-result__quantity-results',
        (el) => Number.parseInt(el.textContent.split(' ')[0]),
      );

      const ad_href = await this.page.$$eval(
        'div.ui-search-result__image > a.ui-search-link',
        (el) => el.map((value) => value.href),
      );

      const price = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--price',
        (el) => el.map((value) => value.textContent.split(' ')[0]),
      );

      const attributes = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--attributes',
        (el) => el.map((value) => value.textContent),
      );

      const title = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--title',
        (el) => el.map((value) => value.textContent),
      );

      const image_href = await this.page.$$eval(
        'div.slick-slide > img.ui-search-result-image__element',
        (el) => el.map((value) => value.src),
      );

      const data = [];

      const scroll = total_ad < 48 ? total_ad : 48;

      for (let ad = 0; ad < scroll; ad++) {
        data.push({
          ad_href: ad_href[ad],
          price: price[ad],
          attributes: attributes[ad],
          title: title[ad],
          image_href: image_href[ad],
        });
      }

      await this.cacheService.setSearch(value.split(' '), JSON.stringify(data));

      return data;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
