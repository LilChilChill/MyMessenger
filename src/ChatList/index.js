import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Dữ liệu mẫu cho danh sách story
const storyData = [
  { id: '1', name: 'Ghi chú của...', avatar: 'https://via.placeholder.com/100', isOnline: false },
  { id: '2', name: 'Tú', avatar: 'https://via.placeholder.com/100', isOnline: true },
  { id: '3', name: 'Hiếu', avatar: 'https://via.placeholder.com/100', isOnline: true },
  { id: '4', name: 'Thu Hương', avatar: 'https://via.placeholder.com/100', isOnline: false },
];

// Dữ liệu mẫu cho danh sách trò chuyện
const chatData = [
  { id: '1', name: 'Phạm Hùng', lastMessage: 'Đã bày tỏ cảm xúc 👍', avatar: 'https://via.placeholder.com/40', isOnline: true },
  { id: '2', name: 'Phan Viết Trường', lastMessage: 'Oke b', avatar: 'https://via.placeholder.com/40', isOnline: true },
  { id: '3', name: 'Nguyễn Phong', lastMessage: 'tỷ b k đi à', avatar: 'https://via.placeholder.com/40', isOnline: false },
];

const ChatListScreen = ({ navigation }) => {
  const [isNavigateVisible, setIsNavigateVisible] = useState(false);

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

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chatId: item.id, userName: item.name })}
    >
      <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
      <View style={styles.chatContent}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
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

      {/* Danh sách trò chuyện */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />

      
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
  chatList: {
    marginBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Màu viền nhạt
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hình tròn
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ sáng
  },
  lastMessage: {
    fontSize: 14,
    color: '#888', // Màu chữ xám nhạt
  },
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
    display: 'none',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
  },
});

export default ChatListScreen;
