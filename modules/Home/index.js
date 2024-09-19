// modules/HomeScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import constants from '../../constants';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles().header}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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

      {/* <View style={styles().search}>
        <Image source={constants.icons.uriSearch} style={styles().icons} />
        <TextInput style={styles().search_input} placeholder='Tìm Kiếm'>
        </TextInput>
      </View> */}

      <View style={styles().search_bg}>
        <View style={styles().search}>
          <Image source={constants.icons.uriSearch} style={styles().icons} />
          <TextInput style={styles().search_input} placeholder='Tìm kiếm' placeholderTextColor={'#8f8f8f'}>
            
          </TextInput>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = () => StyleSheet.create({
    icons_bg:{
      backgroundColor: '#e7e6ef',
      width: 40,
      height: 40,
      borderRadius: 25,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },  
    icons:{
      width: 20,
      height: 20,
      resizeMode: 'contain'
    },
    header:{
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header_text:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 20
    },
    search_bg:{
      marginVertical: 20,
      alignSelf: 'center',
      backgroundColor: '#e7e6ef',
      height: 50,
      width: 300,
      borderRadius: 25,
    },
    search:{
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 16,
    },
    search_input:{
      fontSize: 16,
      borderRadius: 20,
      color: '#000',
    }
})
