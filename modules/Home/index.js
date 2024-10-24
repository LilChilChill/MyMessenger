import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import constants from '../../constants';
import UserIcon from '../UserIcon';
import UserProfile from '../Detail/index'; // Import component UserProfile

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles().container}>
      <View style={styles().header}>
        <View style={styles().headerContent}>
          <TouchableOpacity style={styles().icons_bg} onPress={() => navigation.navigate('Detail')}>
            <Image source={constants.icons.uriMenuList} style={styles().icons} />
          </TouchableOpacity>
          <Text style={styles().header_text}>
            {constants.etc.Home_Page_Title}
          </Text>
        </View>

        <TouchableOpacity style={styles().icons_bg}>
          <Image source={constants.icons.uriEdit} style={styles().icons} />
        </TouchableOpacity>
      </View>

      <View style={styles().search_bg}>
        <View style={styles().search}>
          <Image source={constants.icons.uriSearch} style={styles().icons} />
          <TextInput style={styles().search_input} placeholder='Tìm kiếm' placeholderTextColor={'#8f8f8f'} />
        </View>
      </View>
      
    </View>
  );
};

export default HomeScreen;

const styles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Thay đổi màu nền
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#fff', // Thêm màu nền cho header
    elevation: 3, // Thêm bóng đổ
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons_bg: {
    backgroundColor: '#e7e6ef',
    width: 40,
    height: 40,
    borderRadius: 25,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, // Thêm khoảng cách
  },
  icons: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  header_text: {
    fontSize: 20, // Tăng kích thước chữ
    fontWeight: 'bold',
    color: '#333', // Thay đổi màu chữ
  },
  search_bg: {
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#fff', // Thay đổi màu nền cho thanh tìm kiếm
    height: 50,
    width: '85%', // Đổi chiều rộng thanh tìm kiếm
    borderRadius: 25,
    elevation: 2, // Thêm bóng đổ
  },
  search: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search_input: {
    fontSize: 16,
    borderRadius: 20,
    color: '#000',
    flex: 1, // Chiếm toàn bộ không gian còn lại
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
