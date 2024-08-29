// modules/HomeScreen.js
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import constants from '../../constants';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <View style={styles().header}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={styles().icons_bg}>
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

      <View style={{display: 'flex', alignItems: 'center', marginVertical: 20}}>
        <TextInput style={styles().search} placeholder='Tìm Kiếm'>

        </TextInput>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = () => StyleSheet.create({
    icons_bg:{
      backgroundColor: '#e7e6ef',
      width: 50,
      height: 50,
      borderRadius: 25,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },  
    icons:{
      width: 25,
      height: 25,
      resizeMode: 'contain'
    },
    header:{
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    header_text:{
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 20
    },
    search:{
      backgroundColor: '#e7e6ef',
      height: 50,
      width: 300,
      fontSize: 16,
      borderRadius: 20,
      paddingLeft: 20,
      color: '#000',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    }
})
