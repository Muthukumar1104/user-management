import { test, expect } from "@playwright/test";

test.describe("Signup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("should create account successfully", async ({
    page,
  }) => {
    await page
      .getByTestId("signup-firstname")
      .fill("David");

    await page
      .getByTestId("signup-lastname")
      .fill("Smith");

    await page
      .getByTestId("signup-email")
      .fill(`david${Date.now()}@gmail.com`);

    await page
      .getByTestId("signup-password")
      .fill("David@123");

    await page
      .getByTestId("signup-confirm-password")
      .fill("David@123");

    await page
      .getByTestId("signup-button")
      .click();

    await expect(page).toHaveURL("/");

    await expect(
      page.getByText(/welcome/i)
    ).toBeVisible();
  });

  test("should validate empty fields", async ({
    page,
  }) => {
    await page
      .getByTestId("signup-button")
      .click();

    await expect(
      page.getByText("First name is required")
    ).toBeVisible();

    await expect(
      page.getByText("Last name is required")
    ).toBeVisible();

    await expect(
      page.getByText("Email is required")
    ).toBeVisible();
  });

  test("should validate password mismatch", async ({
    page,
  }) => {
    await page
      .getByTestId("signup-firstname")
      .fill("John");

    await page
      .getByTestId("signup-lastname")
      .fill("Doe");

    await page
      .getByTestId("signup-email")
      .fill(`john${Date.now()}@gmail.com`);

    await page
      .getByTestId("signup-password")
      .fill("John@123");

    await page
      .getByTestId("signup-confirm-password")
      .fill("John@456");

    await page
      .getByTestId("signup-button")
      .click();

    await expect(
      page.getByText("Passwords do not match")
    ).toBeVisible();
  });
});