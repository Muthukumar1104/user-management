import { test, expect } from "@playwright/test";

test.describe("Delete User", () => {
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

  test("should delete an existing user successfully", async ({
    page,
  }) => {
    // Select the first user row
    const userRow = page
      .locator('[data-testid^="user-row-"]')
      .first();

    // Store the user's name before deleting
    const userName = await userRow
      .locator("td")
      .nth(1)
      .textContent();

    // Click Delete button
    await userRow
      .locator('[data-testid^="delete-user-"]')
      .click();

    // Verify Delete modal
    await expect(
      page.getByTestId("user-modal")
    ).toBeVisible();

    await expect(
      page.getByTestId("modal-title")
    ).toHaveText("Delete User");

    await expect(
      page.getByText("Are you sure?")
    ).toBeVisible();

    // Confirm delete
    await page
      .getByRole("button", {
        name: "Delete User",
      })
      .click();

    // Wait until modal closes
    await expect(
      page.getByTestId("user-modal")
    ).toBeHidden();

    // Verify success toast
    await expect(
      page.getByText("User deleted successfully")
    ).toBeVisible();

    // Verify deleted user is no longer in the table
    await expect(
      page.getByText(userName ?? "")
    ).not.toBeVisible();
  });
});