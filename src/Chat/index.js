import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route, navigation }) => {
  const { friendId, friendName, friendAvatar } = route.params; // Nhận friendId, friendName và friendAvatar từ ChatListScreen
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Lưu trữ ID người dùng hiện tại

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId'); // Giả sử userId lưu trữ trong AsyncStorage
      setUserId(id); // Cập nhật ID người dùng hiện tại
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
        const response = await fetch(`http://192.168.1.141:5000/api/messages/${friendId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Gửi token trong header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tin nhắn:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [friendId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Không gửi tin nhắn rỗng

    try {
      const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage
      const response = await fetch(`http://192.168.1.141:5000/api/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: friendId,
          content: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data.messageData, senderId: userId }, // Đánh dấu là tin nhắn của người gửi
      ]); // Cập nhật tin nhắn mới vào danh sách
      setNewMessage(''); // Xóa nội dung trong ô nhập
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error.message);
    }
  };

  const renderMessage = ({ item }) => {
    const isSender = item.senderId === userId; // Kiểm tra xem người gửi có phải là người dùng hiện tại không
    return (
      <View
        style={[
          styles.message,
          isSender ? styles.sentMessage : styles.receivedMessage,
          isSender ? styles.alignRight : styles.alignLeft, // Căn phải nếu là người gửi, căn trái nếu là người nhận
        ]}
      >
        {/* Hiển thị avatar của người gửi bên phải */}
        {isSender && (
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
        )}
  
        <Text style={styles.messageText}>{item.content}</Text>
  
        {/* Hiển thị avatar của bạn bè bên trái */}
        {!isSender && (
          <Image source={{ uri: friendAvatar }} style={styles.avatar} />
        )}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chat với {friendName}</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Đang tải tin nhắn...</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          style={styles.chatContainer}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Nền tối
    padding: 10,
  },
  headerContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ sáng
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#4a90e2', // Màu nền cho tin nhắn gửi đi
  },
  receivedMessage: {
    backgroundColor: '#333', // Màu nền cho tin nhắn nhận được
  },
  alignRight: {
    alignSelf: 'flex-end', // Căn phải cho tin nhắn người gửi
  },
  alignLeft: {
    alignSelf: 'flex-start', // Căn trái cho tin nhắn người nhận
  },
  messageText: {
    color: '#fff', // Màu chữ sáng
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#333', // Màu nền ô nhập
    color: '#fff', // Màu chữ ô nhập
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4a90e2', // Nút gửi với màu nổi bật
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ChatScreen;