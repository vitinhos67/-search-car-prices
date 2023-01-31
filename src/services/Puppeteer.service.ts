import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PuppeterConfigs } from 'src/class/Puppeter.class';

interface PuppeteerInterface {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
}

@Injectable()
export class PuppeteerService
  extends PuppeterConfigs
  implements PuppeteerInterface
{
  browser: puppeteer.Browser;
  page: puppeteer.Page;
}
