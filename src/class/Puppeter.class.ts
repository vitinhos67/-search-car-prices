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

  async setConfigPuppeter(setConfig: SetConfig): Promise<void> {
    const { uri } = setConfig;

    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();

    await this.page.goto(uri);
  }
}
