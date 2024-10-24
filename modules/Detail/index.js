import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null); // Khởi tạo với giá trị null
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log("Token:", token); // Kiểm tra token

      try {
        const response = await axios.get('http://192.168.1.141:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User Data:", response.data); // Kiểm tra dữ liệu người dùng
        setUser(response.data); // Cập nhật state với dữ liệu người dùng
      } catch (err) {
        setError(err.message);
        console.error("API Error:", err); // In ra lỗi nếu có
      }
    };

    fetchUserProfile();
  }, []);

  // Xử lý lỗi nếu có
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // Kiểm tra nếu user vẫn là null hoặc không có thông tin
  if (user === null) {
    console.log("Lỗi không phải user");
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default UserProfile;
