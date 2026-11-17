import type { Page } from '@playwright/test';

import { BaseSection } from './base-section.ts';

export class TraitsSection extends BaseSection {
  constructor(page: Page) {
    super({
      page,
      testId: 'traits-section',
    });
  }
}
