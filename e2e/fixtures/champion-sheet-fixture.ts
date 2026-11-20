import type { PlaywrightTestArgs } from '@playwright/test';

import { ChampionSheetPage } from '../page-objects/champion-sheet-page.ts';
import type { ExtendedFixtures } from './extended-fixtures.ts';

export async function championSheet(
  { page }: PlaywrightTestArgs,
  use: (championSheetPage: ExtendedFixtures['championSheet']) => Promise<void>,
): Promise<void> {
  const championSheetPage = new ChampionSheetPage(page);
  await championSheetPage.goto();

  await use(championSheetPage);
}
