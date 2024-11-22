import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, } from 'react-native';

// Dữ liệu mẫu cho danh sách story
const storyData = [
  { id: '1', name: 'Ghi chú của...', avatar: 'https://via.placeholder.com/100', isOnline: false },
  { id: '2', name: 'Tú', avatar: 'https://via.placeholder.com/100', isOnline: true },
  { id: '3', name: 'Hiếu', avatar: 'https://via.placeholder.com/100', isOnline: true },
  { id: '4', name: 'Thu Hương', avatar: 'https://via.placeholder.com/100', isOnline: false },
];

const ChatListScreen = ({ navigation }) => {

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Thay bằng token thực tế
        const response = await fetch('http://192.168.1.141:5000/api/users/friends', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Gửi token trong header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const formattedFriends = data.map((friend) => ({
          id: friend._id,
          name: friend.name,
          avatar: friend.avatar
            ? `data:${friend.avatar.contentType};base64,${friend.avatar.data}`
            : 'https://via.placeholder.com/40', // Ảnh mặc định nếu không có avatar
        }));

        setFriends(formattedFriends);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const handleNavigateToChat = (friendId, friendName, friendAvatar) => {
    navigation.navigate('ChatScreen', { friendId, friendName, friendAvatar });
  };

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity style={styles.friendItem}
      onPress={() => handleNavigateToChat(item.id, item.name)}
    >
      <Image source={{ uri: item.avatar }} style={styles.friendAvatar} />
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleNavigate = () => {
    navigation.navigate("Settings")
  };

  const renderStory = ({ item }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigate}>
        <Image source={require('../../assets/icons/menu.png')} style={styles.iconMenu} />
      </TouchableOpacity>
      <Text style={styles.header}>Danh sách trò chuyện</Text>

      {/* Danh sách story */}
      <View style={styles.storyListContainer}>
        <FlatList
          data={storyData}
          renderItem={renderStory}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={friends}
          renderItem={renderFriendItem}
          keyExtractor={(item) => item.id}
          style={styles.friendList}
        />
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Màu nền tối
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Màu chữ sáng
  },
  iconMenu: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  storyListContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#121212', // Màu nền tối
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Hình tròn
    borderWidth: 3,
    borderColor: '#4a90e2', // Viền màu xanh nếu là story mới
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34c759', // Màu xanh online
    borderWidth: 2,
    borderColor: '#121212', // Viền đồng màu nền
  },
  storyName: {
    color: '#fff', // Màu chữ sáng
    fontSize: 12,
    maxWidth: 60, // Giới hạn độ rộng của tên
    textAlign: 'center',
  },
  friendList: {
    marginTop: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navigate: {
    display: 'none',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
});

export default ChatListScreen;
