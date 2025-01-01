import { useState } from 'react';
import CreateCategoryModal from '../components/categories/CreateCategoryModal';
import CreateDepartmentModal from '../components/departments/CreateDepartmentModal';
import EditCategoryModal from '../components/categories/EditCategoryModal';
import EditDepartmentModal from '../components/departments/EditDepartmentModal';

const Master = () => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isEditDepartmentModalOpen, setIsEditDepartmentModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string; } | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<{ id: number; name: string; userCount: number; } | undefined>();

  const handleEditCategory = (category: { id: number; name: string; }) => {
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleEditDepartment = (department: { id: number; name: string; userCount: number; }) => {
    setSelectedDepartment(department);
    setIsEditDepartmentModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">マスタ管理</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">カテゴリ管理</h2>
            <button
              onClick={() => setIsCreateCategoryModalOpen(true)}
              className="text-primary hover:text-primary/70"
            >
              新規登録
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { id: 1, name: '文具' },
              { id: 2, name: 'オフィス用品' },
              { id: 3, name: '備品' }
            ].map((category) => (
              <div key={category.id} className="p-4 flex justify-between items-center">
                <span className="text-sm text-gray-900">{category.name}</span>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  編集
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">部署管理</h2>
            <button
              onClick={() => setIsCreateDepartmentModalOpen(true)}
              className="text-primary hover:text-primary/70"
            >
              新規登録
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { id: 1, name: '総務部', userCount: 5 },
              { id: 2, name: '営業部', userCount: 8 },
              { id: 3, name: '開発部', userCount: 12 }
            ].map((department) => (
              <div key={department.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-900">{department.name}</p>
                  <p className="text-xs text-gray-500">所属ユーザー: {department.userCount}名</p>
                </div>
                <button
                  onClick={() => handleEditDepartment(department)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  編集
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateCategoryModal
        isOpen={isCreateCategoryModalOpen}
        onClose={() => setIsCreateCategoryModalOpen(false)}
      />
      <CreateDepartmentModal
        isOpen={isCreateDepartmentModalOpen}
        onClose={() => setIsCreateDepartmentModalOpen(false)}
      />
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false);
          setSelectedCategory(undefined);
        }}
        category={selectedCategory}
      />
      <EditDepartmentModal
        isOpen={isEditDepartmentModalOpen}
        onClose={() => {
          setIsEditDepartmentModalOpen(false);
          setSelectedDepartment(undefined);
        }}
        department={selectedDepartment}
      />
    </div>
  );
};

export default Master;
