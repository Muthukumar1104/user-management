import AppModal from "@/components/modal/AppModal";
import { Trash2 } from "lucide-react";

interface DeleteModalProps {
    show: boolean;
    loading?: boolean;
    userName?: string;
    onClose: () => void;
    onConfirm: () => void;
    dialogClassName?: string;
}

const DeleteModal = ({
    show,
    loading = false,
    userName,
    onClose,
    onConfirm,
    dialogClassName,
}: DeleteModalProps) => {
    return (
        <AppModal
            show={show}
            title="Delete User"
            onClose={onClose}
            onSave={onConfirm}
            saveButtonText="Delete User"
            cancelButtonText="Cancel"
            isLoading={loading}
            dialogClassName={dialogClassName}
        >
            <div className="py-2">

                <div className="d-flex">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle"
                        style={{
                            width: 52,
                            height: 52,
                        }}
                    >
                        <Trash2
                            size={22}
                            className="text-danger"
                        />
                    </div>

                    <div className="ms-3">

                        <p data-testid="delete-confirm-message" className="fw-semibold mb-2 fs-5">
                            Are you sure?
                        </p>

                        <p className="text-muted mb-2">
                            You are about to permanently delete
                            <br />
                            <strong data-testid="delete-user-name" className="text-dark">
                                {userName}
                            </strong>
                        </p>

                        <p className="small text-muted mb-0">
                            This action cannot be undone.
                        </p>

                    </div>

                </div>

            </div>
        </AppModal>
    );
};

export default DeleteModal;