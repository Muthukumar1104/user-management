import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
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
  });

  test("should display dashboard", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("dashboard-banner")
    ).toBeVisible();

    await expect(
      page.getByText(/welcome/i)
    ).toBeVisible();
  });

  test("should display statistics cards", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("total-users-card")
    ).toBeVisible();

    await expect(
      page.getByTestId("active-users-card")
    ).toBeVisible();

    await expect(
      page.getByTestId("inactive-users-card")
    ).toBeVisible();

    await expect(
      page.getByTestId("recent-users-card")
    ).toBeVisible();
  });

  test("should display recent users", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", {
        name: "Recent Users",
      })
    ).toBeVisible();

    await expect(
      page.getByTestId("recent-users-card")
    ).toBeVisible();
  });

  test("should navigate to users page from quick actions", async ({
    page,
  }) => {
    await page
      .getByTestId("manage-users-action")
      .click();

    await expect(page).toHaveURL("/users");
  });
});