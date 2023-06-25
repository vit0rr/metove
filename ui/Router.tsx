import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';
import { LoggedUserOnly } from './components/LoggedUserOnly';
import { AnonymousOnly } from './components/AnonymousOnly';
import { RemoveTransaction } from './RemoveTransaction';
import { AdminOnly } from './components/AdminOnly';

export const RoutePaths = {
  HOME: '/',
  SIGN_UP: '/sign-up',
  REMOVE_TRANSACTION: '/remove-transaction',
};

export const Router = () => {
  return (
    <Routes>
      <Route
        path={RoutePaths.HOME}
        element={
          <LoggedUserOnly>
            <Home />
          </LoggedUserOnly>
        }
      />
      <Route
        path={RoutePaths.SIGN_UP}
        element={
          <AnonymousOnly>
            <SignUp />
          </AnonymousOnly>
        }
      />
      <Route
        path={RoutePaths.REMOVE_TRANSACTION}
        element={
          <AdminOnly>
            <RemoveTransaction />
          </AdminOnly>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
