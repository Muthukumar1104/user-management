import type { User } from "@/types/users";
import type { UserFormValues } from "./schema/userSchema";
import UserForm from "./UserForm";
import AppModal from "@/components/modal";

interface UserModalProps {
  show: boolean;
  user?: User | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (
    data: UserFormValues
  ) => Promise<void> | void;
}

const UserModal = ({
  show,
  user,
  loading = false,
  onClose,
  onSubmit,
}: UserModalProps) => {
  return (
    <AppModal
      show={show}
      title={user ? "Edit User" : "Add User"}
      onClose={onClose}
      showFooter={false}
    >
      <UserForm
        initialValues={user}
        onSubmit={onSubmit}
        onCancel={onClose}
        isSubmitting={loading}
      />
    </AppModal>
  );
};

export default UserModal;