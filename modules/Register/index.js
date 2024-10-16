import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Đảm bảo đường dẫn đúng đến tệp firebaseConfig
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
      // Sử dụng Firebase để tạo người dùng
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Đăng ký thành công!', 'Bạn có thể đăng nhập ngay bây giờ.');
      navigation.navigate('Login'); // Chuyển hướng đến màn hình đăng nhập
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      Alert.alert('Đăng ký thất bại!', error.message || 'Có lỗi xảy ra.');
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
