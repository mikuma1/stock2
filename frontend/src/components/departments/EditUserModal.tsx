import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Department {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  departmentId: number;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  departments: Department[];
  currentDepartmentId: number;
}

const EditUserModal = ({
  isOpen,
  onClose,
  user,
  departments,
  currentDepartmentId
}: EditUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState(currentDepartmentId);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDepartmentId(user.departmentId);
    } else {
      setDepartmentId(currentDepartmentId);
    }
  }, [user, currentDepartmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ユーザー更新の処理
    console.log('ユーザー更新:', {
      id: user?.id,
      name,
      email,
      departmentId,
      isDepartmentChanged: departmentId !== currentDepartmentId
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ユーザー編集"
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              <span className="flex items-center gap-1">
                ユーザー名
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              <span className="flex items-center gap-1">
                所属部署
                <span className="text-red-500 text-xs">*必須</span>
              </span>
            </label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-4 py-2"
              required
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {departmentId !== currentDepartmentId && (
              <p className="mt-1 text-xs text-yellow-600">
                ※部署を変更すると、現在の部署からユーザーが移動します
              </p>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
