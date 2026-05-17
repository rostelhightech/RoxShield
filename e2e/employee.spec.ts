import { test, expect } from "@playwright/test";

test.describe("Employee Space", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/employee");
    await page.evaluate(() => {
      sessionStorage.setItem("cybersense_onboarding_employee", "done");
    });
    await page.reload();
  });

  test("should display employee dashboard", async ({ page }) => {
    // The page should load without errors
    await expect(page).toHaveURL("/employee");
    await expect(page.getByRole("link", { name: /mon espace/i })).toBeVisible();
  });

  test("should have employee navigation items", async ({ page }) => {
    await expect(page.getByRole("link", { name: /mon espace/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /formations/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /résultats/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /badges/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /classement/i })).toBeVisible();
  });

  test("should navigate to badges page", async ({ page }) => {
    await page.getByRole("link", { name: /badges/i }).click();
    await expect(page).toHaveURL("/employee/badges");
  });

  test("should navigate to leaderboard page", async ({ page }) => {
    await page.getByRole("link", { name: /classement/i }).click();
    await expect(page).toHaveURL("/employee/leaderboard");
  });

  test("should navigate to training page", async ({ page }) => {
    await page.getByRole("link", { name: /formations/i }).click();
    await expect(page).toHaveURL("/employee/training");
  });

  test("should navigate to results page", async ({ page }) => {
    await page.getByRole("link", { name: /résultats/i }).click();
    await expect(page).toHaveURL("/employee/results");
  });
});
