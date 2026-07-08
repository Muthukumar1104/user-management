import { http, HttpResponse } from "msw";

import { authUsers } from "./authUsers";

import type {
  LoginPayload,
  SignupPayload,
} from "@/types/auth";

export const authHandlers = [
  // Login
  http.post("/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginPayload;

    const user = authUsers.find(
      (item) =>
        item.email === body.email &&
        item.password === body.password
    );

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const { password, ...userWithoutPassword } =
      user;

    return HttpResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token: "mock-jwt-token",
        user: userWithoutPassword,
      },
    });
  }),

  // Signup
  http.post("/auth/signup", async ({ request }) => {
    const body =
      (await request.json()) as SignupPayload;

    const isUserExists = authUsers.some(
      (item) => item.email === body.email
    );

    if (isUserExists) {
      return HttpResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const newUser = {
      id: (
        Math.max(
          ...authUsers.map((user) =>
            Number(user.id)
          )
        ) + 1
      ).toString(),

      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    };

    authUsers.unshift(newUser);

    const { password, ...userWithoutPassword } =
      newUser;

    return HttpResponse.json(
      {
        success: true,
        message:
          "Account created successfully",
        data: {
          token: "mock-jwt-token",
          user: userWithoutPassword,
        },
      },
      {
        status: 201,
      }
    );
  }),

  // Logout
  http.post("/auth/logout", () => {
    return HttpResponse.json({
      success: true,
      message: "Logout successful",
    });
  }),

  // Logged In User
  http.get("/auth/me", () => {
    const user = authUsers[0];

    const { password, ...userWithoutPassword } =
      user;

    return HttpResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  }),
];