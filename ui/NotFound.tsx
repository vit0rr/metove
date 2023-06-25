import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './Router';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600">Page not found</p>

      <button onClick={() => navigate(RoutePaths.HOME)} className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4">
        Go Home
      </button>
    </div>
  );
};
