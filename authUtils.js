// authUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      throw new Error('Token không tồn tại');
    }
  } catch (error) {
    console.error('Lỗi khi lấy token:', error);
    return null;
  }
};
