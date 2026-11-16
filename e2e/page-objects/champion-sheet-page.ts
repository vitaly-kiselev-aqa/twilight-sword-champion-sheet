import type { Page } from '@playwright/test';

export class ChampionSheetPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
