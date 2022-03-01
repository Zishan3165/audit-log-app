import React, { createContext, ReactElement, useState } from 'react';

export interface AuthProviderProps {
  auth?: any;
  saveAuth?: any;
  removeAuth?: any;
  children?: ReactElement;
}
export const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = (props: AuthProviderProps) => {
  const [auth, setAuth] = useState<any>(JSON.parse(localStorage.getItem('auth') || '{}'));
  const saveAuth = (authObj: object) => {
    setAuth(authObj);
    localStorage.setItem('auth', JSON.stringify(authObj));
  };

  const removeAuth = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, removeAuth }}>
      {props?.children}
    </AuthContext.Provider>
  );
};
