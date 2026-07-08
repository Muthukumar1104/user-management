import { http, HttpResponse } from "msw";
import { users } from "./users";
import { generateUserId } from "@/utils/common";

export const handlers = [
  // Get all users
  http.get("/users", () => {
    return HttpResponse.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  }),

  // Create user
  http.post("/users", async ({ request }) => {
    const body = await request.json();

    const newUser = {
      id: generateUserId(),
      ...(body as Omit<(typeof users)[number], "id">),
    };

    users.unshift(newUser);

    return HttpResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  }),

  // Update user
  http.put("/users/:id", async ({ params, request }) => {
    const { id } = params;

    const body = await request.json();

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    users[index] = {
      ...users[index],
      ...(body as Partial<(typeof users)[number]>),
    };

    return HttpResponse.json({
      success: true,
      message: "User updated successfully",
      data: users[index],
    });
  }),

  // Delete user
  http.delete("/users/:id", ({ params }) => {
    const { id } = params;

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const deletedUser = users[index];

    users.splice(index, 1);

    return HttpResponse.json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  }),
];