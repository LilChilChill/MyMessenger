// modules/DetailScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DetailScreen = ({ navigation }) => {
  return (
    <View>
        <TouchableOpacity style={styles().button} onPress={() => navigation.goBack()}>
            <Text style={styles().button_text}>Go to Detail Screen</Text>
        </TouchableOpacity>
      <Text>Detail Screen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = () => StyleSheet.create({
    button:{
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text:{
        color: 'white',
        fontSize: 16
    }
})
