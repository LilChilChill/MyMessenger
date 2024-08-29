// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './modules/Home';
import DetailScreen from './modules/Detail'; // Đảm bảo bạn đã xuất DetailScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown: false}}  name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
