import type { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

interface AppModalProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  showFooter?: boolean;
  isLoading?: boolean;
  size?: "sm" | "lg" | "xl";
  dialogClassName?: string;
}

const AppModal = ({
  show,
  title,
  children,
  onClose,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  showFooter = true,
  isLoading = false,
  size = "lg",
  dialogClassName,
}: AppModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={!isLoading}
      size={size}
      dialogClassName={dialogClassName}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {showFooter && (
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelButtonText}
          </Button>

          <Button
            variant="primary"
            onClick={onSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : saveButtonText}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AppModal;