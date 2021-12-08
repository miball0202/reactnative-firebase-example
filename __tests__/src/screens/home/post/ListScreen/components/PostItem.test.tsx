import React from 'react';
import PostItem from 'src/screens/home/post/ListScreen/components/PostItem';
import { Timestamp } from 'firebase/firestore';
import { Post } from 'src/types/post';
import { NativeBaseProvider } from 'native-base';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
    const wrapper = shallow(
      <NativeBaseProvider>
        <PostItem post={dummyPost} />
      </NativeBaseProvider>,
    );

    const dateString = wrapper.find('Text').first();
    expect(dateString).toEqual('');
  });
});
