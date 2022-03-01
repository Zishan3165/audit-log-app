import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../utils/hooks/useAuth';

export function RequireAuth() {
  const { auth } = useAuth();
  return auth?.username ? <Outlet /> : <Navigate to="/login" />;
}
