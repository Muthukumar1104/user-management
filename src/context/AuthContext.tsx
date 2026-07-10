import {
    createContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { authService } from "@/services/authService";
import type { AuthContextType } from "@/types/AuthContext";
import type {
    AuthUser,
    LoginPayload,
    SignupPayload,
} from "@/types/auth";

export const AuthContext =
    createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<
        Omit<AuthUser, "password"> | null
    >(null);

    const [token, setToken] = useState<string | null>(
        null
    );

    const [loading, setLoading] = useState(false);

    const isAuthenticated = !!token;

    useEffect(() => {
        const storedToken =
            localStorage.getItem(TOKEN_KEY);

        const storedUser =
            localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (
        payload: LoginPayload
    ) => {
        try {
            setLoading(true);

            const response =
                await authService.login(payload);

            const { token, user } = response.data;

            localStorage.setItem(
                TOKEN_KEY,
                token
            );

            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            setToken(token);
            setUser(user);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (
        payload: SignupPayload
    ) => {
        try {
            setLoading(true);

            const response =
                await authService.signup(payload);

            const { token, user } = response.data;

            localStorage.setItem(
                TOKEN_KEY,
                token
            );

            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            setToken(token);
            setUser(user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);

            await authService.logout();

            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);

            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = useMemo<AuthContextType>(
        () => ({
            user,
            token,
            loading,
            isAuthenticated,
            login,
            signup,
            logout,
        }),
        [
            user,
            token,
            loading,
            isAuthenticated,
            login,
            signup,
            logout,
        ]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};