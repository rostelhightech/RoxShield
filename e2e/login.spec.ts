import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("input#email")).toBeVisible();
    await expect(page.locator("input#password")).toBeVisible();
  });

  test("should have role selection cards", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByText("Super Admin")).toBeVisible();
    await expect(page.getByText("Admin Client")).toBeVisible();
    await expect(page.getByText("Employé")).toBeVisible();
  });

  test("should navigate to dashboard when admin client is selected", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("Admin Client").click();
    await page.locator("button[type='submit']").click();
    await page.waitForURL("/dashboard", { timeout: 15000 });
    await expect(page).toHaveURL("/dashboard");
  });

  test("should navigate to employee space", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("Employé").click();
    await page.locator("button[type='submit']").click();
    await page.waitForURL("/employee", { timeout: 15000 });
    await expect(page).toHaveURL("/employee");
  });

  test("should navigate to admin panel", async ({ page }) => {
    await page.goto("/login");
    await page.getByText("Super Admin").click();
    await page.locator("button[type='submit']").click();
    await page.waitForURL("/admin", { timeout: 15000 });
    await expect(page).toHaveURL("/admin");
  });
});
