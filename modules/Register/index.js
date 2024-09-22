import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp!', 'Vui lòng nhập lại mật khẩu.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.141:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Đăng ký thành công!', 'Bạn có thể đăng nhập ngay bây giờ.');
        navigation.navigate('Login'); // Chuyển hướng đến màn hình đăng nhập
      } else {
        Alert.alert('Đăng ký thất bại!', data.message || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi mạng!', 'Vui lòng kiểm tra kết nối của bạn.');
    }
  };

  return (
    <View style={styles().container}>
      <Text style={styles().title}>Register</Text>
      <TextInput
        style={styles().input}
        placeholder="Email"
        placeholderTextColor={'#000'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles().input}
        placeholder="Password"
        placeholderTextColor={'#000'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles().input}
        placeholder="Confirm Password"
        placeholderTextColor={'#000'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles().button} onPress={handleRegister}>
        <Text style={styles().buttonText}>Register</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('Login')} style={styles().link}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = () => StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#000'
  },
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderRadius: 10,
    borderWidth: 1, 
    marginBottom: 10, 
    padding: 10,
    color: '#000'
  },
  button: {
    backgroundColor: '#328cc7',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },    
  buttonText: {
    color: '#fff',
  },
  link: { 
    color: 'blue', 
    textAlign: 'center',
    color: '#000'
  },
});

export default RegisterScreen;
