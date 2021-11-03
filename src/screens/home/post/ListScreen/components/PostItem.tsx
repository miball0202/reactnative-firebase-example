import React, { useCallback } from 'react';
import { Box, Text, VStack, Center, IconButton, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { Post } from 'src/types/post';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from 'src/types/navigation';
import { timestampToDateLocaleString } from 'src/services/datetime_service';
import { deletePost } from 'src/repositories/posts';
import { useAuth } from 'src/providers/AuthProvider';
import { usePosts } from 'src/providers/PostsProvider';

interface Props {
  post: Post;
}

type NavigationProp = {
  navigation: NativeStackNavigationProp<StackParamsList, 'PostDetail'>;
};

const PostItem = (props: Props) => {
  const { post } = props;
  const { currentUser } = useAuth();
  const { loadPosts } = usePosts();
  const navigation = useNavigation<NavigationProp['navigation']>();

  const deleteUserPost = useCallback(() => {
    if (!currentUser?.uid) {
      return;
    }
    if (!post.id) {
      return;
    }

    deletePost(currentUser.uid, post.id).then(() => {
      loadPosts(currentUser.uid);
    });
  }, [currentUser, loadPosts, post.id]);

  return (
    <SwipeRow disableRightSwipe rightOpenValue={-100} stopRightSwipe={-100}>
      <Box flex={1} alignItems="flex-end">
        <Center bg="red.500" h="100%" w={100}>
          <IconButton
            icon={<Icon as={MaterialIcons} name={'delete'} color="white" />}
            onPress={deleteUserPost}
          />
        </Center>
      </Box>
      <TouchableHighlight
        onPress={() => {
          if (!post.id) {
            return;
          }
          navigation.navigate('PostDetail', { id: post.id });
        }}
        activeOpacity={0.8}
      >
        <Box bg="white" borderWidth="1" borderColor="coolGray.200" p="3">
          <VStack space={1}>
            <Text>{timestampToDateLocaleString(post.updatedAt)}</Text>
            <Text fontSize="md">{post.title}</Text>
            <Text color="gray.500" noOfLines={1}>
              {post.body}
            </Text>
          </VStack>
        </Box>
      </TouchableHighlight>
    </SwipeRow>
  );
};

export default PostItem;
