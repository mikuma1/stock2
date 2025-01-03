import { useState } from 'react';
import Modal from '../Modal';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId?: number;
  departmentName?: string;
}

const CreateUserModal = ({ isOpen, onClose, departmentId, departmentName }: CreateUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('1'); // デフォルトは一般ユーザー

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ユーザー作成の処理
    console.log('ユーザー作成:', {
      name,
      email,
      departmentId,
      description,
      role: Number(role)
    });
    // フォームをリセット
    setName('');
    setEmail('');
    setDescription('');
    setRole('1');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ユーザー作成">
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              所属部署
            </label>
            <p className="mt-1 text-sm text-gray-900">{departmentName}</p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                氏名
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                メールアドレス
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              <span className="flex items-center gap-1">
                権限
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2 appearance-none"
              required
            >
              <option value="0">管理者</option>
              <option value="1">一般ユーザー</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
              <svg className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              備考
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              placeholder="ユーザーに関する備考を入力"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
