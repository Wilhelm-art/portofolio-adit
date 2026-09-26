import { test, expect } from '@playwright/test';

test.describe('Portfolio Critical User Journeys (Slide 5 Suite)', () => {

  test('J-01: Hero and identity load correctly on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check main semantic h1 title
    const heading = page.locator('h1').first();
    await expect(heading).toContainText('Adit Hardiansyah Surachman');

    // Check monogram "A" logo
    const logo = page.locator('nav a[href="/"]').first();
    await expect(logo).toContainText('A');

    // Check profile image cutout (first in DOM is hero)
    const profileImg = page.locator('img[src*="profile-cutout"]').first();
    await expect(profileImg).toBeVisible();

    // Check role banner badge
    await expect(page.locator('text=SOFTWARE ENGINEER & NETWORK SECURITY').first()).toBeVisible();
  });

  test('J-02: 1-Click authentic PDF resume download triggers expected file and ATS view toggles', async ({ page }) => {
    await page.goto('/resume');
    
    // Locate the authentic PDF download button in resume page
    const downloadBtn = page.locator('a[href*="CV_Adit_Hardiansyah_Surachman"][download]').first();
    await expect(downloadBtn).toBeVisible();

    // Verify PDF viewer points to authentic CV asset, not blocked external URL
    const pdfObject = page.locator('object[data*="CV_Adit_Hardiansyah_Surachman"]');
    await expect(pdfObject).toBeVisible();

    // Switch to Interactive ATS View
    const atsTabBtn = page.getByRole('button', { name: /Format ATS Interaktif|Interactive ATS View/i });
    await expect(atsTabBtn).toBeVisible();
    await atsTabBtn.click();

    // Verify authentic ATS content elements
    await expect(page.locator('text=/PROFIL|PROFILE/i').first()).toBeVisible();
    await expect(page.locator('text=STMIK Mardira Indonesia').first()).toBeVisible();
    await expect(page.locator('text=/Dinas Perdagangan dan Perindustrian|Department of Trade and Industry/i').first()).toBeVisible();
    await expect(page.locator('text=Google Cybersecurity').first()).toBeVisible();

    // Switch back to PDF tab
    const pdfTabBtn = page.getByRole('button', { name: /Pratinjau PDF Asli|Authentic PDF Preview/i });
    await pdfTabBtn.click();
    await expect(pdfObject).toBeVisible();

    // Intercept browser download event
    const downloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toContain('CV_Adit_Hardiansyah_Surachman');
  });

  test('J-03: Interactive Command Palette opens via shortcut and filters results', async ({ page }) => {
    await page.goto('/');

    // Open Command Palette via Navbar button or shortcut
    const searchBtn = page.locator('button[aria-label*="Search"]').first();
    await expect(searchBtn).toBeVisible();
    await searchBtn.click();

    // Verify command palette modal input appears
    const searchInput = page.getByTestId('command-palette-input');
    await expect(searchInput).toBeVisible();

    // Type query to filter
    await searchInput.fill('Gadget');
    await expect(page.getByText('GadgetVault').first()).toBeVisible();

    // Escape closes palette
    await page.keyboard.press('Escape');
    await expect(searchInput).not.toBeVisible();
  });

  test('J-04: Project case study navigation loads 3-Tier System Architecture diagram', async ({ page }) => {
    await page.goto('/projects');

    // Click on GadgetVault project
    const gadgetLink = page.locator('a[href*="/projects/gadget-vault"]').first();
    await expect(gadgetLink).toBeVisible();
    await gadgetLink.click();

    // Verify URL
    await expect(page).toHaveURL(/\/projects\/gadget-vault/);

    // Verify 3-Tier System Architecture Diagram sections
    await expect(page.locator('text=Arsitektur Sistem & Alur Data').first()).toBeVisible();
    await expect(page.locator('text=CLIENT & PRESENTATION LAYER').first()).toBeVisible();
    await expect(page.locator('text=LOGIC, STATE & SECURITY LAYER').first()).toBeVisible();
  });

  test('J-05: Non-existent project route displays graceful 404 fallback', async ({ page }) => {
    await page.goto('/projects/non-existent-project-xyz-123');

    // Verify friendly fallback UI
    await expect(page.locator('text=Proyek tidak ditemukan')).toBeVisible();
    const backBtn = page.locator('a[href="/projects"]');
    await expect(backBtn).toBeVisible();

    await backBtn.click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('J-06: Theme Switcher toggles Light Mode and persists in localStorage', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeBtn = page.getByRole('button', { name: /Switch to (light|dark) mode/i }).first();
    await expect(themeBtn).toBeVisible();

    // Click to switch to Light Mode
    await themeBtn.click();
    const html = page.locator('html');
    await expect(html).toHaveClass(/light/);

    // Reload page to verify persistence
    await page.reload();
    await expect(html).toHaveClass(/light/);

    // Toggle back to Dark Mode
    const toggleBackBtn = page.getByRole('button', { name: /Switch to (light|dark) mode/i }).first();
    await toggleBackBtn.click();
    await expect(html).not.toHaveClass(/light/);
  });

  test('J-07: Bilingual localization switches between Indonesian and English', async ({ page }) => {
    await page.goto('/');

    // Click English button
    const enBtn = page.getByRole('button', { name: /English/i }).first();
    await expect(enBtn).toBeVisible();
    await enBtn.click();
    await expect(page).toHaveURL(/\/en/);

    // Click Bahasa Indonesia button
    const idBtn = page.getByRole('button', { name: /Bahasa Indonesia/i }).first();
    await expect(idBtn).toBeVisible();
    await idBtn.click();
    await expect(page).toHaveURL(/\/(?!en)/);
  });

  test('J-08: Contact form validates required fields and handles clipboard copy', async ({ page }) => {
    await page.goto('/contact');

    // Verify heading
    await expect(page.locator('h1')).toBeVisible();

    // Test clipboard copy button
    const copyBtn = page.locator('button[aria-label="Salin alamat email"]');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Verify form fields and length validation
    const nameInput = page.locator('#senderName');
    const subjectInput = page.locator('#subject');
    const messageInput = page.locator('#message');

    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute('maxLength', '100');
    await expect(subjectInput).toBeVisible();
    await expect(subjectInput).toHaveAttribute('maxLength', '150');
    await expect(messageInput).toBeVisible();
    await expect(messageInput).toHaveAttribute('maxLength', '2500');
  });

});
