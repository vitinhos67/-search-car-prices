import { BadGatewayException } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

interface PuppeteerInterface {
  browser: Browser;
  page: Page;
}

interface SetConfig {
  uri: string;
}

export class PuppeterConfigs implements PuppeteerInterface {
  browser: Browser;
  page: Page;
  constructor() {
    this.browser;
    this.page;
  }

  async setConfigPuppeeter(setConfig: SetConfig): Promise<void> {
    try {
      const { uri } = setConfig;

      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();

      await this.page.goto(uri);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
