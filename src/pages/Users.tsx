import { useMemo, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import UserToolbar from "@/components/UserToolbar";
import UserTable from "@/components/UserTable";
import Pagination from "@/components/Pagination";
import UserModal from "@/features/users/UserModal";
import DeleteModal from "@/features/users/DeleteModal";
import type { User } from "@/types/users";
import type { UserFormValues } from "@/features/users/schema/userSchema";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 5;

const Users = () => {
    const {
        users,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
    } = useUsers();

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [showUserModal, setShowUserModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        const value = search.toLowerCase();

        return users.filter(
            (user) =>
                user.firstName.toLowerCase().includes(value) ||
                user.lastName.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value)
        );
    }, [users, search]);

    const totalPages = Math.ceil(
        filteredUsers.length / ITEMS_PER_PAGE
    );

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // ------------------------
    // Add User
    // ------------------------
    const handleAddUser = () => {
        setSelectedUser(null);
        setShowUserModal(true);
    };

    // ------------------------
    // Edit User
    // ------------------------
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

    // ------------------------
    // Delete User (Open Modal)
    // ------------------------
    const handleDelete = (id: string) => {
        const user = users.find(
            (item) => item.id === id
        );

        if (!user) return;

        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    // ------------------------
    // Confirm Delete
    // ------------------------
    const confirmDelete = async () => {
        if (!selectedUser) return;
        await deleteUser(selectedUser.id);
        setShowDeleteModal(false);
        setSelectedUser(null);
        toast.success("User deleted successfully");
    };

    // ------------------------
    // Close Delete Modal
    // ------------------------
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    // ------------------------
    // Create / Update User
    // ------------------------
    const handleSubmit = async (
        data: UserFormValues
    ) => {
        if (selectedUser) {
            await updateUser(selectedUser.id, data);
            toast.success("User updated successfully");
        } else {
            await createUser(data);
            toast.success("User created successfully");
        }

        setShowUserModal(false);
        setSelectedUser(null);
    };

    // ------------------------
    // Close User Modal
    // ------------------------
    const handleCloseModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
    };

    if (loading) {
        return (
            <div className="p-5 text-center">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-5 text-danger">
                {error}
            </div>
        );
    }

    return (
        <>
            <UserToolbar
                search={search}
                onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                onAddUser={handleAddUser}
            />

            <UserTable
                users={paginatedUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Add / Edit Modal */}
            <UserModal
                show={showUserModal}
                user={selectedUser}
                loading={loading}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />

            {/* Delete Modal */}
            <DeleteModal
                show={showDeleteModal}
                loading={loading}
                userName={
                    selectedUser
                        ? `${selectedUser.firstName} ${selectedUser.lastName}`
                        : ""
                }
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default Users;