import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserIcon = () => {
  return (
    <View style={styles().container}>
      
      <FlatList 
        renderItem={() => {
            <View>
                <Text style={styles().text}>UserIcon</Text>
            </View>
        }}
      />
    </View>
  )
}

export default UserIcon

const styles = () => StyleSheet.create({
  container: {
    backgroundColor: '#000'
  },
  text: {
    color: '#000'
  }
})