import { test, expect } from "@playwright/test";

test.describe("Edit User", () => {
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

  test("should edit an existing user successfully", async ({
    page,
  }) => {
    const updatedUser = {
      firstName: "Updated",
      lastName: "User",
      email: `updated${Date.now()}@gmail.com`,
      age: "35",
      status: "Inactive",
    };

    // Edit the first user
    await page
      .locator('[data-testid^="edit-user-"]')
      .first()
      .click();

    // Verify modal
    await expect(
      page.getByTestId("user-modal")
    ).toBeVisible();

    await expect(
      page.getByTestId("modal-title")
    ).toHaveText("Edit User");

    // Update fields
    await page
      .getByTestId("first-name")
      .fill(updatedUser.firstName);

    await page
      .getByTestId("last-name")
      .fill(updatedUser.lastName);

    await page
      .getByTestId("email")
      .fill(updatedUser.email);

    await page
      .getByTestId("age")
      .fill(updatedUser.age);

    await page
      .getByTestId("status")
      .selectOption(updatedUser.status);

    // Save
    await page
      .getByTestId("save-user")
      .click();

    // Wait until modal closes
    await expect(
      page.getByTestId("user-modal")
    ).toBeHidden();

    // Success toast
    await expect(
      page.getByText("User updated successfully")
    ).toBeVisible();

    // Find only the edited row using the unique email
    const updatedRow = page
      .locator("tbody tr")
      .filter({
        hasText: updatedUser.email,
      });

    // Verify row exists
    await expect(updatedRow).toBeVisible();

    // Verify updated values
    await expect(updatedRow).toContainText(
      `${updatedUser.firstName} ${updatedUser.lastName}`
    );

    await expect(updatedRow).toContainText(
      updatedUser.email
    );

    await expect(updatedRow).toContainText(
      updatedUser.status
    );
  });
});