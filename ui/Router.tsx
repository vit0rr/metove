import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';

export const RoutePaths = {
  HOME: '/',
  SIGN_UP: '/sign-up',
};

export const Router = () => {
  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<Home />} />
      <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
