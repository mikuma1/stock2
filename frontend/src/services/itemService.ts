import apiClient from '../lib/axios';
import { ApiResponse, Item, ItemRequest } from '../types/api';

export const itemService = {
  // 消耗品一覧の取得
  getItems: () => {
    return apiClient.get<ApiResponse<Item[]>>('/items');
  },

  // 消耗品の取得
  getItem: (id: number) => {
    return apiClient.get<ApiResponse<Item>>(`/items/${id}`);
  },

  // 消耗品の作成
  createItem: (data: ItemRequest) => {
    return apiClient.post<ApiResponse<Item>>('/items', data);
  },

  // 消耗品の更新
  updateItem: (id: number, data: ItemRequest) => {
    return apiClient.put<ApiResponse<Item>>(`/items/${id}`, data);
  },

  // 消耗品の削除
  deleteItem: (id: number) => {
    return apiClient.delete<ApiResponse<void>>(`/items/${id}`);
  },
};
