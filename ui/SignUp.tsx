import React, { useState } from 'react';

import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './Router';
import { ErrorAlert } from './components/ErrorAlert';
import { Meteor } from 'meteor/meteor';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ reason: 'Passwords do not match' });
      setTimeout(() => {
        setError(undefined);
      }, 5000);
      return;
    }

    Accounts.createUser({ email, password }, (error) => {
      if (error) {
        setError(error);
        return;
      }

      navigate(RoutePaths.HOME);
    });
  };

  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        setError(error);
        return;
      }

      navigate(RoutePaths.HOME);
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <h3 className="px-3 py-2 text-lg font-medium">{isSignUp ? 'Sign up' : 'Sign in'}</h3>
      {error && <ErrorAlert message={error.reason || 'Unknow error'} />}

      <form className="mt-6">
        <div className="flex flex-col">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label htmlFor="password" className="mt-5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {isSignUp && (
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label htmlFor="password" className="mt-5 block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                type="password"
                id="ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>
        <div className="px-2 py-3 text-center">
          <button
            className="border border-gray-800 text-black px-4 py-2 rounded-md mt-4"
            onClick={() => navigate(RoutePaths.HOME)}
          >
            Back to home
          </button>

          {isSignUp && (
            <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md mt-4" onClick={signUp} type="submit">
              Sign up
            </button>
          )}

          {!isSignUp && (
            <button className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md mt-4" onClick={signIn} type="submit">
              Sign In
            </button>
          )}
        </div>

        <div className="py-3 text-center">
          <a onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:text-blue-800 cursor-pointer">
            {isSignUp ? 'Already have an account? Sign in' : 'Create an account'}
          </a>
        </div>
      </form>
    </div>
  );
};
