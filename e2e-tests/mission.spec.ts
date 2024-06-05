import { test, expect, Locator } from '@playwright/test';

export const getStyle = async (locator: Locator, property: string): Promise<string> => {
  return locator.evaluate((el, property) => window.getComputedStyle(el).getPropertyValue(property), property);
};

test('switch theme', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('themeSwitch')).toBeVisible();
  const navbarBgColorLight = await getStyle(page.getByTestId('navbar'), 'background-color');
  expect(navbarBgColorLight).toBe('rgba(255, 255, 255, 0.7)');
  await page.getByTestId('themeSwitch').click();
  const navbarBgColorDark = await getStyle(page.getByTestId('navbar'), 'background-color');
  expect(navbarBgColorDark).toBe('rgba(0, 0, 0, 0.7)');
});

test('switch theme', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByTestId('themeSwitch')).toBeVisible();
  const navbarBgColorLight = await getStyle(page.getByTestId('navbar'), 'background-color');
  expect(navbarBgColorLight).toBe('rgba(255, 255, 255, 0.7)');
  await page.getByTestId('themeSwitch').click();
  const navbarBgColorDark = await getStyle(page.getByTestId('navbar'), 'background-color');
  expect(navbarBgColorDark).toBe('rgba(0, 0, 0, 0.7)');
});

test('search by mission name', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.getByPlaceholder('Search by name...')).toBeVisible();
  await page.getByPlaceholder('Search by name...').fill('2021-11');
  await expect(page.locator('tbody > tr')).toHaveCount(1);
});

test('sort by name', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page.locator('tbody > tr').nth(0)).toContainText('Expedition 2021-10');
  await expect(page.getByRole('columnheader', { name: 'NAME' })).toBeVisible();
  await page.getByRole('columnheader', { name: 'NAME' }).click();
  await expect(page.locator('tbody > tr').nth(0)).toContainText('Expedition 2022-05');
});

test('create new mission', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('button', { name: 'New mission' }).click();
  await expect(page.getByPlaceholder('Enter expedition name')).toBeVisible();
  await page.getByPlaceholder('Enter expedition name').fill('Expedition 2024-06');
  await page.getByRole('button', { name: 'New member' }).click();
  await page.getByRole('button', { name: 'Select member' }).click();
  await page.getByLabel('Pilot', { exact: true }).getByText('Pilot').click();
  await page.getByPlaceholder('Enter experience').fill('12');
  await page.getByRole('button', { name: 'New member' }).click();
  await page.getByRole('button', { name: 'Select member' }).click();
  await page.getByLabel('Passenger', { exact: true }).getByText('Passenger').click();
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('tbody > tr')).toHaveCount(4);
});

test('edit mission', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByLabel('Expedition 2021-10').getByRole('img').click();
  await page.getByPlaceholder('Enter expedition name').fill('Updated Expedition name');
  await page.getByPlaceholder('Enter experience').nth(0).fill('12');

  await page.getByRole('button', { name: 'New member' }).click();
  await page.getByRole('button', { name: 'Select member' }).click();
  await page.getByLabel('Passenger', { exact: true }).getByText('Passenger').click();
  await page.getByRole('img').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Updated Expedition name').isVisible();
});
