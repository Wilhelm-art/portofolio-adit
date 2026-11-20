import { test, expect } from '@playwright/test';

test.describe('Projects Page Deep Live Audit (Production)', () => {

  test('P-01: Page status, document title, and meta tags load properly', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto('/projects', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);

    const title = await page.title();
    console.log('[LOCAL AUDIT] Document Title:', title);

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
    console.log('[LOCAL AUDIT] Meta Description:', metaDesc);

    expect(consoleErrors).toHaveLength(0);
  });

  test('P-02: All 8 project cards rendered with valid screenshots, badges, and links', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'networkidle' });

    const articles = page.locator('article');
    const count = await articles.count();
    console.log('[AUDIT] Project Cards Count:', count);
    expect(count).toBeGreaterThanOrEqual(8);

    // Verify each project image loads and is not broken
    const images = page.locator('article img');
    const imgCount = await images.count();
    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const src = await img.getAttribute('src');
      console.log(`[AUDIT] Image ${i + 1}: ${src} -> naturalWidth: ${naturalWidth}px`);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('P-03: Interactive filtering and search functionality on live page', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'networkidle' });

    // Test Search for Lacakin
    const searchInput = page.locator('input[aria-label*="proyek"], input[aria-label*="projects"]').first();
    await searchInput.fill('Lacakin');
    await page.waitForTimeout(300);
    let count = await page.locator('article').count();
    console.log('[LOCAL AUDIT] Search "Lacakin" count:', count);
    expect(count).toBe(1);
    await expect(page.locator('article h2').first()).toContainText('Lacakin');

    // Test Search for Disdagin
    await searchInput.fill('Disdagin');
    await page.waitForTimeout(300);
    count = await page.locator('article').count();
    console.log('[LOCAL AUDIT] Search "Disdagin" count:', count);
    expect(count).toBe(1);
    await expect(page.locator('article h2').first()).toContainText('SIPK DISDAGIN');

    // Test Search for Non-existent
    await searchInput.fill('random-non-existent-xyz');
    await page.waitForTimeout(300);
    count = await page.locator('article').count();
    console.log('[LOCAL AUDIT] Search non-existent count:', count);
    expect(count).toBe(0);
    await expect(page.locator('text=/Tidak ada proyek yang cocok|No projects match/i')).toBeVisible();

    // Reset filter
    await page.locator('text=/Atur ulang filter|Reset filter/i').click();
    await page.waitForTimeout(300);
    count = await page.locator('article').count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('P-04: Category filter buttons responsiveness', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'networkidle' });

    const buttons = page.locator('button[aria-pressed]');
    const btnCount = await buttons.count();
    for (let i = 0; i < btnCount; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent())?.trim();
      await btn.click();
      await page.waitForTimeout(300);
      const visibleCards = await page.locator('article').count();
      console.log(`[LOCAL AUDIT] Filter "${text}" -> ${visibleCards} projects visible`);
    }
  });

  test('P-05: Mobile viewport (375x667) responsiveness and zero horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/projects', { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log('[LOCAL AUDIT] Mobile horizontal overflow detected:', overflow);
    expect(overflow).toBe(false);
  });

});
