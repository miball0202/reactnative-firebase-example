import React, { createContext, useCallback, useContext, useState } from 'react';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { Post } from 'src/types/post';
import { postsRef } from '../repositories/posts';

interface PostsContextValue {
  posts: Post[];
  loadPosts: (uid: string) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

const PostsContext = createContext<PostsContextValue | null>(null);

const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async (uid: string) => {
    const q = query(postsRef(uid), orderBy('updatedAt', 'desc'));
    const postsSnapshot = await getDocs(q);
    const userPosts: Post[] = postsSnapshot.docs.map(
      doc =>
        ({
          ...{ id: doc.id },
          ...doc.data(),
        } as Post),
    );
    setPosts(userPosts);
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loadPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => {
  const postsCxt = useContext(PostsContext);
  if (!postsCxt) {
    throw new Error('usePosts() called outside of a PostsProvider?');
  }
  return postsCxt;
};

export { PostsProvider, usePosts };
