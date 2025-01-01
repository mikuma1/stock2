import { useState } from 'react';
import CreateCategoryModal from '../components/categories/CreateCategoryModal';
import CreateDepartmentModal from '../components/departments/CreateDepartmentModal';
import EditCategoryModal from '../components/categories/EditCategoryModal';
import DeleteCategoryModal from '../components/categories/DeleteCategoryModal';
import DepartmentList from '../components/departments/DepartmentList';

interface Category {
  id: number;
  name: string;
}

const Master = () => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteCategoryModalOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    // TODO: カテゴリ削除の処理
    console.log('カテゴリ削除:', selectedCategory);
    setIsDeleteCategoryModalOpen(false);
    setSelectedCategory(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">マスタ管理</h1>

        <div className="flex gap-4 text-sm">
          <a
            href="#categories"
            className="text-primary hover:text-primary/70"
          >
            カテゴリ管理
          </a>
          <a
            href="#departments"
            className="text-primary hover:text-primary/70"
          >
            部署管理
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <div id="categories" className="scroll-mt-6">
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
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="departments" className="scroll-mt-6">
          <DepartmentList
            onCreateClick={() => setIsCreateDepartmentModalOpen(true)}
          />
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
      <DeleteCategoryModal
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => {
          setIsDeleteCategoryModalOpen(false);
          setSelectedCategory(undefined);
        }}
        onConfirm={handleConfirmDeleteCategory}
        categoryName={selectedCategory?.name ?? ''}
      />
    </div>
  );
};

export default Master;
