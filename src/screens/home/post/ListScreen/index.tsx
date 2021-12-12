import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Box, ScrollView, Fab, Icon } from 'native-base';
import PostItem from './components/PostItem';
import { usePosts } from 'src/providers/PostsProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from 'src/types/navigation';
import { addPost } from 'src/repositories/posts';
import { useAuth } from 'src/providers/AuthProvider';

type NavigationProp = {
  navigation: NativeStackNavigationProp<StackParamsList, 'PostDetail'>;
};

const ListScreen = () => {
  const { currentUser } = useAuth();
  const { posts, loadPosts } = usePosts();
  const navigation = useNavigation<NavigationProp['navigation']>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshPosts = useCallback(() => {
    if (!currentUser) {
      return;
    }
    setIsLoading(true);
    loadPosts(currentUser.uid).then(() => setIsLoading(false));
  }, [currentUser, loadPosts]);
  const handlePressAddIcon = useCallback(() => {
    if (!currentUser) {
      return;
    }
    addPost(currentUser.uid, {
      title: '',
      body: '',
    }).then(doc => {
      navigation.navigate('PostDetail', { id: doc.id });
    });
  }, [currentUser, navigation]);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  return (
    <Box flex={1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshPosts} />
        }
      >
        {posts.map(post => (
          <PostItem post={post} key={post.id} />
        ))}
      </ScrollView>
      <Fab
        icon={<Icon color="white" as={MaterialIcons} name="add" />}
        bottom={60}
        renderInPortal={false}
        onPress={handlePressAddIcon}
        colorScheme="indigo"
      />
    </Box>
  );
};

export default ListScreen;
