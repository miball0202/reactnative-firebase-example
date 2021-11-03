import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { useAuth } from '../providers/AuthProvider';
import * as SplashScreen from 'expo-splash-screen';

const AppNavigator = () => {
  const { currentUser, isAuthLoaded } = useAuth();

  useEffect(() => {
    if (isAuthLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isAuthLoaded]);

  return (
    <NavigationContainer>
      {!currentUser ? <AuthNavigator /> : <HomeNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
