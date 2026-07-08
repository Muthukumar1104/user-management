export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: "Active" | "Inactive";
}

export type CreateUser = Omit<User, "id">;

export type UpdateUser = Partial<CreateUser>;