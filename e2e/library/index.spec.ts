import { test, expect } from '@playwright/test';

test.describe('library', () => {
    test.describe('ui', () => {
        test('has title', async ({ page }) => {
            await page.goto('/');

            await expect(page).toHaveTitle(/Framewise/);
        });

        test('has two nav links in sidebar', async ({ page }) => {
            await page.goto('/');

            await expect(
                page.getByRole('link', { name: 'Library' })
            ).toHaveText('Library');
            await expect(
                page.getByRole('link', { name: 'Settings' })
            ).toHaveText('Settings');
        });

        test('has three action buttons', async ({ page }) => {
            await page.goto('/');

            await expect(page.getByTestId('Reload Videos')).toHaveCount(1);
            await expect(page.getByTestId('Sort')).toHaveCount(1);
            await expect(page.getByTestId('Upload')).toHaveCount(1);
        });

        test('has searchbox', async ({ page }) => {
            await page.goto('/');

            await expect(page.getByTestId('searchbox')).toHaveCount(1);
        });
    });
});
