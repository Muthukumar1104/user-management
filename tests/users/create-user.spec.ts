import { test, expect } from "@playwright/test";

test.describe("Create User", () => {
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

    // Verify Dashboard
    await expect(page).toHaveURL("/");

    // Navigate to Users
    await page
      .getByTestId("nav-users")
      .click();

    await expect(page).toHaveURL("/users");
  });

  test("should create a new user successfully", async ({
    page,
  }) => {
    const user = {
      firstName: "Playwright",
      lastName: "Tester",
      email: `playwright${Date.now()}@gmail.com`,
      age: "28",
      status: "Active",
    };

    const userModal =
      page.getByTestId("user-modal");

    // Open Add User modal
    await page
      .getByTestId("add-user-button")
      .click();

    // Verify modal opens
    await expect(userModal).toBeVisible();

    // Fill form
    await page
      .getByTestId("first-name")
      .fill(user.firstName);

    await page
      .getByTestId("last-name")
      .fill(user.lastName);

    await page
      .getByTestId("email")
      .fill(user.email);

    await page
      .getByTestId("age")
      .fill(user.age);

    await page
      .getByTestId("status")
      .selectOption(user.status);

    // Submit
    await page
      .getByTestId("save-user")
      .click();

    // Modal closes
    await expect(userModal).toBeHidden();

    // Success toast
    await expect(
      page.getByText("User created successfully")
    ).toBeVisible();

    // Find created user row
    const userRow = page
      .locator("tbody tr")
      .filter({
        hasText: user.email,
      });

    // Verify row
    await expect(userRow).toBeVisible();

    await expect(userRow).toContainText(
      `${user.firstName} ${user.lastName}`
    );

    await expect(userRow).toContainText(
      user.email
    );

    await expect(userRow).toContainText(
      user.status
    );
  });
});