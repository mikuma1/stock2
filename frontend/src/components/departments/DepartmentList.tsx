import { useState } from 'react';
import EditDepartmentModal from './EditDepartmentModal';
import DeleteUserModal from './DeleteUserModal';
import DeleteDepartmentModal from './DeleteDepartmentModal';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  userCount: number;
  users: User[];
}

interface DepartmentListProps {
  onCreateClick: () => void;
}

const DepartmentList = ({ onCreateClick }: DepartmentListProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isDeleteDepartmentModalOpen, setIsDeleteDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [expandedDepartmentId, setExpandedDepartmentId] = useState<number | null>(null);

  // サンプルデータ
  const departments: Department[] = [
    {
      id: 1,
      name: '総務部',
      userCount: 3,
      users: [
        { id: 1, name: '山田太郎', email: 'yamada@example.com' },
        { id: 2, name: '鈴木花子', email: 'suzuki@example.com' },
        { id: 3, name: '田中一郎', email: 'tanaka@example.com' },
      ]
    },
    {
      id: 2,
      name: '営業部',
      userCount: 2,
      users: [
        { id: 4, name: '佐藤次郎', email: 'sato@example.com' },
        { id: 5, name: '高橋三郎', email: 'takahashi@example.com' },
      ]
    },
  ];

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteUserModalOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteDepartmentModalOpen(true);
  };

  const handleConfirmDeleteUser = () => {
    // TODO: ユーザー削除の処理
    console.log('ユーザー削除:', selectedUser);
    setIsDeleteUserModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleConfirmDeleteDepartment = () => {
    // TODO: 部署削除の処理
    console.log('部署削除:', selectedDepartment);
    setIsDeleteDepartmentModalOpen(false);
    setSelectedDepartment(undefined);
  };

  const toggleDepartment = (departmentId: number) => {
    setExpandedDepartmentId(expandedDepartmentId === departmentId ? null : departmentId);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">部署管理</h2>
          <button
            onClick={onCreateClick}
            className="text-primary hover:text-primary/70"
          >
            新規登録
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {departments.map((department) => (
            <div key={department.id}>
              <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => toggleDepartment(department.id)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedDepartmentId === department.id ? 'transform rotate-90' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-900">{department.name}</p>
                    <p className="text-xs text-gray-500">所属ユーザー: {department.userCount}名</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(department);
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    編集
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDepartment(department);
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    削除
                  </button>
                </div>
              </div>
              {expandedDepartmentId === department.id && (
                <div className="bg-gray-50 px-4 py-3 space-y-3">
                  {department.users.map((user) => (
                    <div key={user.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        削除
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDepartment(undefined);
        }}
        department={selectedDepartment}
      />

      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        onClose={() => {
          setIsDeleteUserModalOpen(false);
          setSelectedUser(undefined);
        }}
        onConfirm={handleConfirmDeleteUser}
        userName={selectedUser?.name ?? ''}
      />

      <DeleteDepartmentModal
        isOpen={isDeleteDepartmentModalOpen}
        onClose={() => {
          setIsDeleteDepartmentModalOpen(false);
          setSelectedDepartment(undefined);
        }}
        onConfirm={handleConfirmDeleteDepartment}
        departmentName={selectedDepartment?.name ?? ''}
        userCount={selectedDepartment?.userCount ?? 0}
      />
    </>
  );
};

export default DepartmentList;
