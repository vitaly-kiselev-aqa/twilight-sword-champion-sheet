import type { Page } from '@playwright/test';

import { BaseSection } from './base-section.ts';

export class EquipmentSection extends BaseSection {
  constructor(page: Page) {
    super({
      page,
      testId: 'equipment-section',
    });
  }
}
