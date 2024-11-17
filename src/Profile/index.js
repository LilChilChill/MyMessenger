import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getAuthToken } from '../../authUtils';

export default function ProfileScreen() {
  // State để chứa dữ liệu profile
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy dữ liệu profile khi component được mount
  useEffect(() => {
    // Giả sử bạn đã có API /api/users/me để lấy thông tin profile người dùng
    const fetchProfile = async () => {
      try {
        const token = await getAuthToken();
        const response = await fetch('http://192.168.1.141:5000/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Thêm token JWT vào header
          },
        });

        if (!response.ok) {
          throw new Error('Lỗi khi tải thông tin người dùng');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Nếu đang tải dữ liệu, hiển thị loading spinner
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Nếu có lỗi khi tải dữ liệu
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: profile.avatar ? `data:${profile.avatar.contentType};base64,${profile.avatar.data}` : 'https://www.example.com/your-profile-pic.jpg' }}  // Hiển thị ảnh đại diện
        />
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileBio}>{profile.bio || 'Chưa có bio'}</Text>
      </View>
      <Button title="Chỉnh sửa thông tin" onPress={() => alert('Chỉnh sửa profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
    textAlign: 'center',
  },
});
