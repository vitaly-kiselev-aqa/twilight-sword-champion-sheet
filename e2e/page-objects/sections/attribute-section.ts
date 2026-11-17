import type { Page } from '@playwright/test';

import { BaseSection } from './base-section.ts';

export class AttributeSection extends BaseSection {
  constructor(page: Page) {
    super({
      page,
      testId: 'attribute-section',
    });
  }
}
