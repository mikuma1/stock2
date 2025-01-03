import { useState } from 'react';
import EditDepartmentModal from './EditDepartmentModal';
import EditUserModal from './EditUserModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
import CreateUserModal from './CreateUserModal';

interface User {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  role: number;
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
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isDeleteDepartmentModalOpen, setIsDeleteDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [expandedDepartmentId, setExpandedDepartmentId] = useState<number | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [selectedDepartmentForUser, setSelectedDepartmentForUser] = useState<Department | undefined>();

  // サンプルデータ
  const departments: Department[] = [
    {
      id: 1,
      name: '総務部',
      userCount: 3,
      users: [
        { id: 1, name: '山田太郎', email: 'yamada@example.com', departmentId: 1, role: 0 },
        { id: 2, name: '鈴木花子', email: 'suzuki@example.com', departmentId: 1, role: 1 },
        { id: 3, name: '田中一郎', email: 'tanaka@example.com', departmentId: 1, role: 1 },
      ]
    },
    {
      id: 2,
      name: '営業部',
      userCount: 2,
      users: [
        { id: 4, name: '佐藤次郎', email: 'sato@example.com', departmentId: 2, role: 1 },
        { id: 5, name: '高橋三郎', email: 'takahashi@example.com', departmentId: 2, role: 1 },
      ]
    },
  ];

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleEditUser = (user: User, department: Department) => {
    setSelectedUser(user);
    setSelectedDepartment(department);
    setIsEditUserModalOpen(true);
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

  const handleCreateUser = (department: Department) => {
    setSelectedDepartmentForUser(department);
    setIsCreateUserModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">部署管理</h2>
          <button
            onClick={onCreateClick}
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            新規作成
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
                <div className="bg-gray-50 px-4 py-3">
                  <div className="mb-3 flex justify-end">
                    <button
                      onClick={() => handleCreateUser(department)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      ユーザーを追加
                    </button>
                  </div>

                  <div className="space-y-3">
                    {department.users.map((user) => (
                      <div key={user.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{user.email}</span>
                            {user.role === 0 && (
                              <span className="border border-gray-300 rounded px-1.5 py-0.5">
                                管理者
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleEditUser(user, department)}
                            className="text-sm text-gray-600 hover:text-gray-900"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setSelectedUser(undefined);
          setSelectedDepartment(undefined);
        }}
        user={selectedUser}
        departments={departments}
        currentDepartmentId={selectedDepartment?.id ?? 0}
      />

      <DeleteConfirmModal
        isOpen={isDeleteUserModalOpen}
        onClose={() => {
          setIsDeleteUserModalOpen(false);
          setSelectedUser(undefined);
        }}
        onDelete={handleConfirmDeleteUser}
        title="ユーザーの削除"
        message="削除してもよろしいですか？"
        targetName={selectedUser?.name ?? ''}
        hideDefaultFooter
      />

      <DeleteConfirmModal
        isOpen={isDeleteDepartmentModalOpen}
        onClose={() => {
          setIsDeleteDepartmentModalOpen(false);
          setSelectedDepartment(undefined);
        }}
        onDelete={handleConfirmDeleteDepartment}
        title="部署の削除"
        message="削除してもよろしいですか？"
        targetName={selectedDepartment?.name ?? ''}
        hideDefaultFooter
      >
        {selectedDepartment && selectedDepartment.userCount > 0 && (
          <div className="text-xs text-red-500 space-y-1 mt-2">
            <p>※この部署には{selectedDepartment.userCount}名のユーザーが所属しています。</p>
            <p>※削除する前に、所属ユーザーを他の部署に移動させてください。</p>
          </div>
        )}
      </DeleteConfirmModal>

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => {
          setIsCreateUserModalOpen(false);
          setSelectedDepartmentForUser(undefined);
        }}
        departmentId={selectedDepartmentForUser?.id}
        departmentName={selectedDepartmentForUser?.name}
      />
    </>
  );
};

export default DepartmentList;
