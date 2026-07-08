import type { CreateUser, UpdateUser, User } from "./users";


export interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;

  createUser: (
    user: CreateUser
  ) => Promise<void>;

  updateUser: (
    id: string,
    user: UpdateUser
  ) => Promise<void>;

  deleteUser: (
    id: string
  ) => Promise<void>;
}