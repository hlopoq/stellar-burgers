import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  isUserAuthenticatedSelector,
  userSelector
} from '../../services/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isPublic?: boolean;
};

export const ProtectedRoute = ({ isPublic, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isUserAuthenticatedSelector);
  const user = useSelector(userSelector);

  if (!isAuthChecked && user !== null) {
    return <Preloader />;
  }

  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
