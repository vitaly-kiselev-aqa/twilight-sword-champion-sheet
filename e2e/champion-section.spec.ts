import { expect, test } from './fixtures.ts';

test('title is invisible', async ({ championSheet }) => {
  const { title } = championSheet.championSection;

  await expect(title).toBeVisuallyHidden();
  await expect(title).toHaveAccessibleName('Чемпион');
});
