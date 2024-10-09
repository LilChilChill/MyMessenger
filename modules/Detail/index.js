import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native';

const DetailScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); // Giả sử email lấy từ API hoặc AsyncStorage
  const [isEditing, setIsEditing] = useState(false); // Biến để kiểm soát chế độ chỉnh sửa
  const [avatar, setAvatar] = useState('https://example.com/avatar.jpg'); // Giả sử avatar từ API

  // Hàm lấy thông tin từ cơ sở dữ liệu (API)
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://192.168.1.141:5000/api/user?email=${email}`);
      const data = await response.json();

      if (response.ok && data.username) {
        setUserName(data.username);
      } else {
        setUserName(email); // Nếu không có tên người dùng, dùng email
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng');
    }
  };

  const handleSaveUserName = async () => {
    if (userName.trim() === '') {
      Alert.alert('Lỗi', 'Tên người dùng không được để trống');
      return;
    }

    try {
      // Gọi API để lưu tên người dùng mới
      const response = await fetch('http://192.168.1.141:5000/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, username: userName }), // Gửi cả email và username
      });

      if (response.ok) {
        Alert.alert('Thành công', 'Tên người dùng đã được cập nhật');
        setIsEditing(false);
      } else {
        Alert.alert('Lỗi', 'Không thể cập nhật tên người dùng');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu tên người dùng');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header với icon quay lại */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết</Text>
      </View>

      {/* Ảnh đại diện và tên người dùng */}
      <TouchableOpacity style={styles.avatarContainer} onPress={() => Alert.alert('Thông báo', 'Chức năng thay đổi ảnh đại diện')}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>

      {/* Chỉnh sửa tên người dùng */}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nhập tên người dùng mới"
        />
      ) : (
        <Text style={styles.userName}>{userName}</Text>
      )}

      {/* Nút Lưu */}
      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSaveUserName}>
          <Text style={styles.buttonText}>Lưu tên người dùng</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Chỉnh sửa tên</Text>
        </TouchableOpacity>
      )}

      {/* Các nút chức năng khác */}
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Cập nhật', 'Chức năng cập nhật')}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Trợ giúp', 'Chức năng trợ giúp')}>
        <Text style={styles.buttonText}>Trợ giúp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  backText: {
    fontSize: 24,
    color: 'blue',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#000',
  },
  avatarContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#328cc7',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
