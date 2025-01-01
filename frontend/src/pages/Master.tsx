import { useState } from 'react';
import CreateCategoryModal from '../components/categories/CreateCategoryModal';
import CreateDepartmentModal from '../components/departments/CreateDepartmentModal';

const Master = () => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = useState(false);

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
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 flex justify-between items-center">
                <span className="text-sm text-gray-900">文具</span>
                <button className="text-sm text-gray-600 hover:text-gray-900">
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
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-900">総務部</p>
                  <p className="text-xs text-gray-500">所属ユーザー: 5名</p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">
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
    </div>
  );
};

export default Master;
