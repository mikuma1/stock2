import axios from 'axios';
import { ApiError } from '../types/api';

// 環境変数の値をログ出力
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: '予期せぬエラーが発生しました',
      errors: {},
    };

    if (error.response) {
      // サーバーからのエラーレスポンス
      apiError.message = error.response.data.message || apiError.message;
      apiError.errors = error.response.data.errors;
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      apiError.message = 'サーバーに接続できません';
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
