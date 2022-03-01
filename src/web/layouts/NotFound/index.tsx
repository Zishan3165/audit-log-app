import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../utils/hooks/useAuth';
import { MainPageLayout } from '../MainPageLayout';

export const NotFound = () => {
  const { auth } = useAuth();
  return auth?._id ? (
    <MainPageLayout>
      <div className="text-center mt-2">
        <h1>404 - Not Found!</h1>
      </div>
    </MainPageLayout>
  ) : (
    <Navigate replace to="/login" />
  );
};
