import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from 'src/clients/firebase';
import { logout } from 'src/clients/firebase/auth';
import { User } from 'firebase/auth';

interface AuthContextValue {
  currentUser: User | null;
  isAuthLoaded: boolean;
  logoutAndResetAuth: () => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);

  const logoutAndResetAuth = useCallback(() => {
    logout().then(() => {
      setCurrentUser(null);
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        setCurrentUser(user);
      } else {
        logout();
      }
      setIsAuthLoaded(true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthLoaded,
        logoutAndResetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authCxt = useContext(AuthContext);
  if (!authCxt) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return authCxt;
};

export { AuthProvider, useAuth };
