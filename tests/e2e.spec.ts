import { expect, test } from '@playwright/test';

const baseURL = 'http://localhost:3000';
// const prodURL = 'https://rpgsheet.games/'

test.describe('rpg sheet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });
  test('should be titled "rpg sheet"', async ({ page }) => {
    await expect(page).toHaveTitle('rpg sheet');
  });
});
