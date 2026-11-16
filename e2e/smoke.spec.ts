import { test, expect } from '@playwright/test';
import { ChampionSheetPage } from './page-objects/champion-sheet-page.ts';

test('has title', async ({ page }) => {
  const championSheet = new ChampionSheetPage(page);
  await championSheet.goto();

  await expect(championSheet.page).toHaveTitle(
    'Лист Чемпиона — Twilight Sword',
  );
});
