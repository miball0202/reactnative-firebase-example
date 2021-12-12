import React, { useState, useEffect, useCallback } from 'react';
import { Box, Input } from 'native-base';
import { Post } from 'src/types/post';
import { StackParamsList } from 'src/types/navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { savePost, getPost } from 'src/repositories/posts';
import { useAuth } from 'src/providers/AuthProvider';
import { usePosts } from 'src/providers/PostsProvider';

type NavigationProp = {
  route: RouteProp<StackParamsList, 'PostDetail'>;
};

const DetailScreen = () => {
  const { currentUser } = useAuth();
  const { loadPosts } = usePosts();
  const { params } = useRoute<NavigationProp['route']>();
  const [post, setPost] = useState<Post>({
    title: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangePostText = useCallback((key: string, value: string) => {
    setPost(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleBlurInput = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    await savePost(currentUser.uid, params.id, post);
  }, [currentUser, params.id, post]);

  const refreshPosts = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    await loadPosts(currentUser.uid);
  }, [currentUser, loadPosts]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    getPost(currentUser.uid, params.id)
      .then(postDoc => {
        if (postDoc.exists()) {
          setPost(postDoc.data() as Post);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      refreshPosts();
    };
  }, [currentUser, params.id, refreshPosts]);

  return (
    <Box flex={1} bg="white">
      <Input
        value={post.title}
        onChangeText={val => {
          handleChangePostText('title', val);
        }}
        fontSize="md"
        fontWeight="bold"
        isDisabled={isLoading}
        onBlur={handleBlurInput}
      />
      <Input
        value={post.body}
        onChangeText={val => {
          handleChangePostText('body', val);
        }}
        fontSize="md"
        minH={'100%'}
        multiline
        isDisabled={isLoading}
        onBlur={handleBlurInput}
      />
    </Box>
  );
};

export default DetailScreen;
