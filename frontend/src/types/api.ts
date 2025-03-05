// API レスポンスの型定義
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// エラーレスポンスの型定義
export interface ApiError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

// 消耗品の型定義
export interface Item {
  id: number;
  name: string;
  category: string;
  stock: number;
  orderPoint: number;
  consumptionUnit: string;
  unitsPerOrder: number;
  location?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

// 消耗品作成・更新時のリクエストの型定義
export interface ItemRequest {
  name: string;
  category: string;
  stock: number;
  orderPoint: number;
  consumptionUnit: string;
  unitsPerOrder: number;
  location?: string;
  url?: string;
}
