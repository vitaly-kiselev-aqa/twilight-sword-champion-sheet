import type { Locator, Page } from '@playwright/test';

type Params = {
  page: Page;
  testId: string;
};

export abstract class BaseSection {
  readonly root: Locator;

  constructor({ page, testId }: Params) {
    this.root = page.getByTestId(testId);
  }
}
