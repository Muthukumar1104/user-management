import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { userService } from "@/services/userService";
import type {
    User,
    CreateUser,
    UpdateUser,
} from "@/types/users";
import type { UserContextType } from "@/types/UserContext";

export const UserContext =
    createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({
    children,
}: UserProviderProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    // Fetch Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await userService.getUsers();

            setUsers(response.data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    };

    // Create User
    const createUser = async (
        user: CreateUser
    ) => {
        try {
            setLoading(true);
            setError(null);

            await userService.createUser(user);

            await fetchUsers();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create user"
            );
        } finally {
            setLoading(false);
        }
    };

    // Update User
    const updateUser = async (
        id: string,
        user: UpdateUser
    ) => {
        try {
            setLoading(true);
            setError(null);

            await userService.updateUser(
                id,
                user
            );

            await fetchUsers();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update user"
            );
        } finally {
            setLoading(false);
        }
    };

    // Delete User
    const deleteUser = async (
        id: string
    ) => {
        try {
            setLoading(true);
            setError(null);

            await userService.deleteUser(id);

            await fetchUsers();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete user"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                loading,
                error,
                fetchUsers,
                createUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};