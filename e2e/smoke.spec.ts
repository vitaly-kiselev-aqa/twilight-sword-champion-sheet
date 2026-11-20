import { expect, test } from './fixtures.ts';

test('has title', async ({ championSheet }) => {
  await expect(championSheet.page).toHaveTitle(
    'Лист Чемпиона — Twilight Sword',
  );
});

test('has sections', async ({ championSheet }) => {
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
