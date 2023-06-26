import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { RoutePaths } from '../Router';
import { Meteor } from 'meteor/meteor';

export const AdminOnly = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  const location = useLocation();
  useEffect(() => {
    Meteor.call('roles.isAdmin', (err, isAdminReturn) => {
      if (err) {
        setIsAdmin(false);
      }

      setIsAdmin(isAdminReturn);
    });
  }, []);

  if (!isAdmin) {
    return <Navigate to={RoutePaths.HOME} state={{ from: location }} replace />;
  }

  return children;
};
