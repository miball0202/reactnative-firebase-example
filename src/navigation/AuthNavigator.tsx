import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamsList } from 'src/types/navigation';
import LoginScreen from 'src/screens/auth/LoginScreen';
import SignUpScreen from 'src/screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator<StackParamsList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
