import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthenticationContext from '../AuthContext';

export default function Logout() {
  const { setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    localStorage.removeItem('token');
    setUser({});
  }, [setUser]);

  return <Navigate to="/" />;
}
