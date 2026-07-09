import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should login successfully", async ({ page }) => {
    await page.getByTestId("login-email").fill("admin@gmail.com");

    await page
      .getByTestId("login-password")
      .fill("Admin@123");

    await page
      .getByTestId("login-button")
      .click();

    await expect(page).toHaveURL("/");

    await expect(
      page.getByText(/welcome/i)
    ).toBeVisible();
  });

  test("should show validation errors", async ({
    page,
  }) => {
    await page
      .getByTestId("login-button")
      .click();

    await expect(
      page.getByText("Email is required")
    ).toBeVisible();

    await expect(
      page.getByText("Password is required")
    ).toBeVisible();
  });

  test("should reject invalid credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    await page
      .getByTestId("login-email")
      .fill("wrong@gmail.com");

    await page
      .getByTestId("login-password")
      .fill("Wrong@123");

    await page
      .getByTestId("login-button")
      .click();

    // User stays on login page
    await expect(page).toHaveURL("/login");

    // Login form is still visible
    await expect(
      page.getByTestId("login-button")
    ).toBeVisible();
  });
});