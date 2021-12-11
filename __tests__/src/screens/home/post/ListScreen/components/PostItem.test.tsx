import React from 'react';
import PostItem from 'src/screens/home/post/ListScreen/components/PostItem';
import { Timestamp } from 'firebase/firestore';
import { Post } from 'src/types/post';
import { NativeBaseProvider, Text } from 'native-base';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

configure({ adapter: new Adapter() });

jest.mock('src/providers/AuthProvider', () => ({
  useAuth: jest.fn(() => ({
    currentUser: {
      uid: 'dummyUid',
    },
  })),
}));

jest.mock('src/providers/PostsProvider', () => ({
  usePosts: jest.fn(() => ({
    loadPosts: jest.fn(),
  })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigation: {
      navigate: jest.fn(),
    },
  })),
}));

describe('PostItem', () => {
  it('has post title and body', () => {
    const timestamp = {
      seconds: 0,
      nanoseconds: 0,
    } as Timestamp;
    const dummyPost: Post = {
      id: '',
      title: 'title',
      body: 'body',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const tree = create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PostItem post={dummyPost} />
      </NativeBaseProvider>
    ).root

    console.log(tree.children)
    const textHasTitle = tree.findAllByProps({value: 'title'})
    const textHasBody = tree.findAllByProps({value: 'body'})

    console.log(textHasTitle)

    expect(textHasTitle.length).toBe(1);
    expect(textHasBody.length).toBe(1);
  });
});
