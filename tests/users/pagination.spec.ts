import { test, expect } from "@playwright/test";

test.describe("Pagination", () => {
  test.beforeEach(async ({ page }) => {
    // Login
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

    // Navigate to Users page
    await page
      .getByTestId("nav-users")
      .click();

    await expect(page).toHaveURL("/users");
  });

  test("should display pagination", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("pagination")
    ).toBeVisible();

    await expect(
      page.getByTestId("page-info")
    ).toContainText("Page");
  });

  test("should navigate to next page", async ({
    page,
  }) => {
    const nextButton =
      page.getByTestId("next-page");

    if (await nextButton.isEnabled()) {
      await nextButton.click();

      await expect(
        page.getByTestId("page-info")
      ).toContainText("Page 2");
    }
  });

  test("should navigate to previous page", async ({
    page,
  }) => {
    const nextButton =
      page.getByTestId("next-page");

    if (await nextButton.isEnabled()) {
      await nextButton.click();

      await expect(
        page.getByTestId("page-info")
      ).toContainText("Page 2");

      await page
        .getByTestId("previous-page")
        .click();

      await expect(
        page.getByTestId("page-info")
      ).toContainText("Page 1");
    }
  });

  test("should navigate by page number", async ({
    page,
  }) => {
    const pageTwo =
      page.getByTestId("page-2");

    if (await pageTwo.count()) {
      await pageTwo.click();

      await expect(
        page.getByTestId("page-info")
      ).toContainText("Page 2");
    }
  });
});