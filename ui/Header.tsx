import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import { useNavigate } from 'react-router-dom';

import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { RoutePaths } from './Router';

import { useLoggedUser } from 'meteor/quave:logged-user-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    setMobileMenuOpen(false);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-indigo-600">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="false" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a
            onClick={() => navigate(RoutePaths.HOME)}
            className="text-lg font-semibold leading-6 text-white hover:cursor-pointer"
          >
            Metove
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoadingLoggedUser && !loggedUser && (
            <a
              onClick={() => navigate(RoutePaths.SIGN_UP)}
              className="text-sm font-semibold leading-6 text-white hover:cursor-pointer"
            >
              Sign In/Sign up <span aria-hidden="true">&rarr;</span>
            </a>
          )}
          {!isLoadingLoggedUser && loggedUser && (
            <a
              onClick={() => Meteor.logout()}
              className="text-sm font-semibold leading-6 text-white hover:cursor-pointer"
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-indigo-600 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              className="-mx-3 block rounded-md px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {!isLoadingLoggedUser && (
                <div className="py-6">
                  {!loggedUser && (
                    <a
                      onClick={() => handleNavigation(RoutePaths.SIGN_UP)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                    >
                      Sign In/Sign Up
                    </a>
                  )}
                  {loggedUser && (
                    <a
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                    >
                      Log Out
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
