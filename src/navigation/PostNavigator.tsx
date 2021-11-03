import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from 'src/screens/home/post/ListScreen';
import DetailScreen from 'src/screens/home/post/DetailScreen';

const Stack = createNativeStackNavigator();

const PostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="PostList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PostList" component={ListScreen} />
      <Stack.Screen name="PostDetail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default PostNavigator;
