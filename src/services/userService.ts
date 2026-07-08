import { api } from "./api";
import type { ApiResponse } from "@/types/api";
import type {
  User,
  CreateUser,
  UpdateUser,
} from "@/types/users";

export const userService = {
  getUsers: async () => {
    const response = await api.get<
      ApiResponse<User[]>
    >("/users");

    return response.data;
  },

  createUser: async (
    user: CreateUser
  ) => {
    const response = await api.post<
      ApiResponse<User>
    >("/users", user);

    return response.data;
  },

  updateUser: async (
    id: string,
    user: UpdateUser
  ) => {
    const response = await api.put<
      ApiResponse<User>
    >(`/users/${id}`, user);

    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete<
      ApiResponse<User>
    >(`/users/${id}`);

    return response.data;
  },
};