import { useState, useEffect } from 'react';
import Modal from '../Modal';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: {
    id: number;
    name: string;
  };
}

const EditCategoryModal = ({ isOpen, onClose, category }: EditCategoryModalProps) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: カテゴリ更新の処理
    console.log('カテゴリ更新:', { id: category?.id, name });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="カテゴリ編集"
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              <span className="flex items-center gap-1">
                カテゴリ名
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
        </div>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
