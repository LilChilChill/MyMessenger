import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.141:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Đăng nhập thành công!', data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('Lỗi', data.message);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối tới API.');
    }
  };

  return (
    <View style={styles().container}>
      <Text style={styles().title}>Login</Text>
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
      <TouchableOpacity style={styles().button} onPress={handleLogin}>
        <Text style={styles().buttonText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('Register')} style={styles().link}>
        Don't have an account? Sign up
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

export default LoginScreen;
