import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.141:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        console.log('token', data.token);
        navigation.navigate('ChatList');
      } else {
        Alert.alert('Đăng nhập thất bại', data.message || 'Vui lòng thử lại.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối với máy chủ');
    }
    // navigation.navigate('ChatList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng quay lại!</Text>
      <Text style={styles.subtitle}>Đăng nhập vào tài khoản của bạn</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Chưa có tài khoản? <Text style={styles.linkHighlight}>Đăng ký</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: { 
    width: '100%',
    height: 50, 
    borderColor: '#ddd', 
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1, 
    marginBottom: 20, 
    padding: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#4a90e2',
    borderRadius: 15,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },    
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: { 
    color: '#aaa', 
    textAlign: 'center',
    marginTop: 20,
  },
  linkHighlight: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});

export default LoginScreen;