import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { WebSitesInterface } from 'src/interfaces/WebSites.interface';
import { PuppeterConfigs } from 'src/class/Puppeter.class';

@Injectable()
export class MercadoLivreService
  extends PuppeterConfigs
  implements WebSitesInterface
{
  logger = new Logger(MercadoLivreService.name);

  constructor() {
    super();
  }

  async load(search: string): Promise<any> {
    try {
      const uri = `https://lista.mercadolivre.com.br/veiculos/${search}`;

      this.logger.log(`The vehicle ${search} is being researched`);

      await this.setConfigPuppeeter({
        uri,
      });
      await this.page.waitForSelector('#root-app');
      const total_ad = await this.page.$eval(
        'span.ui-search-search-result__quantity-results',
        (el) => Number.parseInt(el.textContent.split(' ')[0])
      );

      const ad_href = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-result__image > img',
        (el) => el.map((search) => search.src)
      );

      const price = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--price',
        (el) => el.map((search) => search.textContent.split(' ')[0])
      );

      const attributes = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--attributes',
        (el) => el.map((search) => search.textContent)
      );

      const title = await this.page.$$eval(
        'div.ui-search-result__content-wrapper > div.ui-search-item__group--title',
        (el) => el.map((search) => search.textContent)
      );

      const image_href = await this.page.$$eval(
        'div.slick-slide > img.ui-search-result-image__element',
        (el) => el.map((search) => search.src)
      );

      const data = [];

      const scroll = total_ad < 48 ? total_ad : 48;

      for (let ad = 0; ad < scroll; ad++) {
        /* const tokenize = title[ad].toLowerCase().split(' '); */
        data.push({
          href_annoncements: ad_href[ad] ?? null,
          price: price[ad] ?? null,
          attributes: attributes[ad] ?? null,
          title: title[ad] ?? null,
          image_href: image_href[ad] ?? null,
          provider: 'mercado_livre',
          /* tags: [...tokenize], */
          status: 'active',
        });
      }
      return data;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
