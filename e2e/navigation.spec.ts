import { test, expect } from "@playwright/test";

test.describe("Global Navigation & Pages", () => {
  test("should show 404 for unknown routes", async ({ page }) => {
    await page.goto("/unknown-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText(/cette page n.existe pas/i)).toBeVisible();
  });

  test("about page should display company info", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Herdy Rostel Youlou")).toBeVisible();
    await expect(page.getByText("Dakar, Sénégal").first()).toBeVisible();
    await expect(page.getByText("contact@rostelhightech.com")).toBeVisible();
  });

  test("about page should display timeline", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("2021")).toBeVisible();
    await expect(page.getByText("2024").first()).toBeVisible();
    await expect(page.getByText("2025")).toBeVisible();
  });

  test("admin panel should be accessible", async ({ page }) => {
    await page.goto("/admin");
    await page.evaluate(() => {
      sessionStorage.setItem("cybersense_onboarding_super-admin", "done");
    });
    await page.reload();
    await expect(page).toHaveURL("/admin");
    // Admin header should be visible
    await expect(page.locator("header h1")).toBeVisible();
  });

  test("settings page should have tabs", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.evaluate(() => {
      sessionStorage.setItem("cybersense_onboarding_admin-client", "done");
    });
    await page.reload();
    await expect(page.getByRole("tab", { name: /organisation/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /notifications/i })).toBeVisible();
    await expect(page.getByRole("tab", { name: /sécurité/i })).toBeVisible();
  });

  test("settings page should have plan section", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.evaluate(() => {
      sessionStorage.setItem("cybersense_onboarding_admin-client", "done");
    });
    await page.reload();
    await expect(page.getByText("Plan Business")).toBeVisible();
  });
});
