import Modal from './Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
  message: string;
  targetName: string;
  hideDefaultFooter?: boolean;
  children?: React.ReactNode;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onDelete,
  title,
  message,
  targetName,
  children,
}: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} hideDefaultFooter>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">「{targetName}」を{message}</p>
          <p className="text-sm text-red-500">※この操作は取り消せません。</p>
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
          >
            削除
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
