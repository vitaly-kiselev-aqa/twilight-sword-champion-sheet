import type { Locator, Page } from '@playwright/test';

type Params = {
  page: Page;
  testId: string;
};

export abstract class BaseSection {
  readonly root: Locator;

  readonly title: Locator;

  constructor({ page, testId }: Params) {
    this.root = page.getByTestId(testId);

    this.title = this.root.getByRole('heading', { level: 2 });
  }
}
