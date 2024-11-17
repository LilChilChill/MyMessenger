import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function ChatScreen() {
  return (
    <View>
      <Text>Chat Screen</Text>
      <TextInput placeholder="Type a message..." />
      <Button title="Send" onPress={() => {}} />
    </View>
  );
}
