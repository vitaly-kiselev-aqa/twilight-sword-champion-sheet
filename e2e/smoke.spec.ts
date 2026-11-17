import { test, expect } from '@playwright/test';
import { ChampionSheetPage } from './page-objects/champion-sheet-page.ts';

test('has title', async ({ page }) => {
  const championSheet = new ChampionSheetPage(page);
  await championSheet.goto();

  await expect(championSheet.page).toHaveTitle(
    'Лист Чемпиона — Twilight Sword',
  );
});

test('has sections', async ({ page }) => {
  const championSheet = new ChampionSheetPage(page);
  await championSheet.goto();

  const {
    championSection,
    attributeSection,
    equipmentSection,
    inventorySection,
    traitsSection,
  } = championSheet;

  await expect(championSection.root).toBeVisible();
  await expect(attributeSection.root).toBeVisible();
  await expect(equipmentSection.root).toBeVisible();
  await expect(inventorySection.root).toBeVisible();
  await expect(traitsSection.root).toBeVisible();
});
