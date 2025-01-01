import Modal from '../Modal';

interface DeleteDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  departmentName: string;
  userCount: number;
}

const DeleteDepartmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  departmentName,
  userCount
}: DeleteDepartmentModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="部署の削除"
      hideDefaultFooter
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {departmentName}を削除してもよろしいですか？
        </p>
        {userCount > 0 && (
          <div className="text-xs text-red-500 space-y-1">
            <p>※この部署には{userCount}名のユーザーが所属しています。</p>
            <p>※削除する前に、所属ユーザーを他の部署に移動させてください。</p>
          </div>
        )}
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
          disabled={userCount > 0}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          削除する
        </button>
      </div>
    </Modal>
  );
};

export default DeleteDepartmentModal;
