import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import services from '../../../services';
import { useAuth } from '../../../utils/hooks/useAuth';
import SpinnerComponent from '../SpinnerComponent';

export function RequireAuth() {
  const { auth, removeAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const checkUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await services.getUser(id);
      setLoading(false);
      if (response?.responseCode !== 200) {
        removeAuth();
      }
    } catch (e) {
      setLoading(false);
      removeAuth();
    }
  };

  useEffect(() => {
    if (auth?._id) {
      checkUser(auth._id);
    }
  }, [auth]);

  if (loading) {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <SpinnerComponent />
      </div>
    );
  }

  return auth?.username ? <Outlet /> : <Navigate to="/login" />;
}
