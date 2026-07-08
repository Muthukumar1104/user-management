import { api } from "./api";
import type {
    LoginPayload,
    SignupPayload,
    AuthResponse,
    CurrentUser,
} from "@/types/auth";

export const authService = {
    login: async (payload: LoginPayload) => {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            payload
        );
        return response.data;
    },

    signup: async (payload: SignupPayload) => {
        const response = await api.post<AuthResponse>(
            "/auth/signup",
            payload
        );
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get<CurrentUser>("/auth/me");
        return response.data;
    },
};