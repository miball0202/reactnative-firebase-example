import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import PostNavigator from './PostNavigator';
import { Divider } from 'native-base';
import { useAuth } from '../providers/AuthProvider';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  const { logoutAndResetAuth } = useAuth();

  return (
    <Drawer.Navigator
      initialRouteName="Post"
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Divider />
            <DrawerItem label="Logout" onPress={logoutAndResetAuth} />
          </DrawerContentScrollView>
        );
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4f46e5',
        },
        headerTintColor: '#fff',
        swipeEnabled: false,
        drawerActiveBackgroundColor: '#c7d2fe',
        drawerActiveTintColor: '#312e81',
        drawerInactiveTintColor: '#312e81',
      }}
    >
      <Drawer.Screen name="Post" component={PostNavigator} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
