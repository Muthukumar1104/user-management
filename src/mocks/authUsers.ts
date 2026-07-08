import type { AuthUser } from "@/types/auth";
import { MOCK_PASSWORDS } from "./constants";

export const authUsers: AuthUser[] = [
    {
        id: "100001",
        firstName: "Admin",
        lastName: "User",
        email: "admin@gmail.com",
        password: MOCK_PASSWORDS.admin,
    },
    {
        id: "100002",
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: MOCK_PASSWORDS.user,
    },
];