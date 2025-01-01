import Modal from '../Modal';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }: DeleteUserModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ユーザーの削除"
      hideDefaultFooter
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {userName}を削除してもよろしいですか？
        </p>
        <div className="text-xs text-red-500">
          ※この操作は取り消せません
        </div>
      </div>

      {/* カスタムフッター */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
        >
          キャンセル
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          削除する
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
