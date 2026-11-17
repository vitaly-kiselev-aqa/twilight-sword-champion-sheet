import type { Page } from '@playwright/test';

import { BaseSection } from './base-section.ts';

export class ChampionSection extends BaseSection {
  constructor(page: Page) {
    super({
      page,
      testId: 'champion-section',
    });
  }
}
