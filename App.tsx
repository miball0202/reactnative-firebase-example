import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import AppProvider from './src/providers/AppProvider';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    const preventHideSplash = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    preventHideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
