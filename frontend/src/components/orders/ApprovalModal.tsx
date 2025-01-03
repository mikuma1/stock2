import Modal from '../Modal';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
  productName?: string;
  quantity?: number;
  unit?: string;
  requester?: string;
  department?: string;
}

const ApprovalModal = ({
  isOpen,
  onClose,
  orderNumber,
  productName,
  quantity,
  unit,
  requester,
  department
}: ApprovalModalProps) => {
  const handleApprove = () => {
    // TODO: 承認の処理
    console.log('承認:', {
      orderNumber,
      action: 'approve'
    });
    onClose();
  };

  const handleReject = () => {
    // TODO: 却下の処理
    console.log('却下:', {
      orderNumber,
      action: 'reject'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="承認"
      hideDefaultFooter
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            発注番号
          </label>
          <p className="mt-1 text-sm text-gray-900">{orderNumber ?? '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            商品名
          </label>
          <p className="mt-1 text-sm text-gray-900">{productName ?? '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            申請数
          </label>
          <p className="mt-1 text-sm text-gray-900">{quantity} {unit}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            申請者
          </label>
          <p className="mt-1 text-sm text-gray-900">{requester ?? '-'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            申請部署
          </label>
          <p className="mt-1 text-sm text-gray-900">{department ?? '-'}</p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex justify-center rounded-md border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            却下
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            承認
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ApprovalModal;
