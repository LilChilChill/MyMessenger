// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './modules/Home';
import DetailScreen from './modules/Detail';
import LoginScreen from './modules/Login';
import RegisterScreen from './modules/Register';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown: false}}  name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
