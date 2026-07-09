import { test, expect } from "@playwright/test";

test.describe("Logout", () => {
  test("should logout successfully", async ({
    page,
  }) => {
    await page.goto("/login");

    await page
      .getByTestId("login-email")
      .fill("admin@gmail.com");

    await page
      .getByTestId("login-password")
      .fill("Admin@123");

    await page
      .getByTestId("login-button")
      .click();

    await expect(page).toHaveURL("/");


    await page
      .getByTestId("profile-menu")
      .click();


    await page
      .getByTestId("logout-button")
      .click();

    await expect(page).toHaveURL("/login");

    await expect(
      page.getByTestId("login-button")
    ).toBeVisible();
  });
});