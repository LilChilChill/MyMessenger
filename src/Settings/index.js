import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log("xóa thành công")
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <View>
      <Text>Settings</Text>
      <View style={styles.navigate}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FriendsList')}
        >
          <Text style={styles.buttonText}>Danh sách bạn bè</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FriendRequests')}
        >
          <Text style={styles.buttonText}>Yêu cầu kết bạn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Hồ sơ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff', // Màu xanh nút
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navigate: {
  },
})
