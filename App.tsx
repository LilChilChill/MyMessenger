import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './modules/Home';
import RegisterScreen from './modules/Register';
import DetailScreen from './modules/Detail';
import LoginScreen from './modules/Login';
import UserProfile from './modules/Detail';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true); // Người dùng đã đăng nhập
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        )}
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Detail" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
