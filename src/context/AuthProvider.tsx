import React, { createContext, useState } from 'react';
import { User } from '../web/types';

export const AUTH_STORAGE_KEY = 'auth';

export interface AuthProviderProps {
  auth: User | null;
  saveAuth: (authObj: User) => void;
  removeAuth: () => void;
}

const getUserFromLocalStorage = (): User | null => {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    return null;
  }
};
export const AuthContext = createContext<null | AuthProviderProps>(null);

export const AuthProvider = (props: React.PropsWithChildren) => {
  const [auth, setAuth] = useState<User | null>(getUserFromLocalStorage());

  const saveAuth = (authObj: User) => {
    setAuth(authObj);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authObj));
  };

  const removeAuth = () => {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, removeAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
