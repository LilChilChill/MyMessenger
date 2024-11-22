import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.141:5000/api', // Thay bằng địa chỉ backend của bạn
});

// Thêm token nếu cần thiết
API.interceptors.request.use((req) => {
  const token = AsyncStorage.getItem('token'); // Lấy token từ Redux/AsyncStorage nếu có
  console.log('token api', token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
