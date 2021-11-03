import React from 'react';
import { AuthProvider } from './AuthProvider';
import { PostsProvider } from './PostsProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <PostsProvider>{children}</PostsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
