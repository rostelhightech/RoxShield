import { test, expect } from "@playwright/test";

test.describe("Dashboard (Admin Client)", () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss onboarding by setting sessionStorage before navigating
    await page.goto("/dashboard");
    await page.evaluate(() => {
      sessionStorage.setItem("cybersense_onboarding_admin-client", "done");
    });
    await page.reload();
  });

  test("should display KPI cards", async ({ page }) => {
    await expect(page.getByText("45%").first()).toBeVisible();
    await expect(page.getByText("10").first()).toBeVisible();
  });

  test("should display risk evolution chart", async ({ page }) => {
    await expect(page.locator(".recharts-responsive-container").first()).toBeVisible();
  });

  test("should have sidebar navigation", async ({ page }) => {
    await expect(page.getByRole("link", { name: /employés/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /formations/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /simulations/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /rapports/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /paramètres/i })).toBeVisible();
  });

  test("should navigate to employees page", async ({ page }) => {
    await page.getByRole("link", { name: /employés/i }).click();
    await expect(page).toHaveURL("/dashboard/employees");
  });

  test("should navigate to reports page", async ({ page }) => {
    await page.getByRole("link", { name: /rapports/i }).click();
    await expect(page).toHaveURL("/dashboard/reports");
  });

  test("should navigate to settings page", async ({ page }) => {
    await page.getByRole("link", { name: /paramètres/i }).click();
    await expect(page).toHaveURL("/dashboard/settings");
  });
});
