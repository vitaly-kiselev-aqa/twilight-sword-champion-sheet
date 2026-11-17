import { expect as baseExpect, test as baseTest } from '@playwright/test';

import { championSheet } from './fixtures/champion-sheet-fixture.ts';
import type { ExtendedFixtures } from './fixtures/extended-fixtures.ts';
import { toBeVisuallyHidden } from './matchers/visually-hidden-matcher.ts';

export const test = baseTest.extend<ExtendedFixtures>({
  championSheet,
});

export const expect = baseExpect.extend({
  toBeVisuallyHidden,
});
