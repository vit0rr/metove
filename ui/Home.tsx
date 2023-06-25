import React from 'react';

import { useLoggedUser } from 'meteor/quave:logged-user-react';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Wallet } from './Wallet';
import { Loading } from './components/Loading';

export const Home = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  if (isLoadingLoggedUser) {
    return <Loading />;
  }

  if (!loggedUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold">Welcome to Metove!</h1>
        <p className="text-lg mt-4">Please sign up or log in to continue.</p>
      </div>
    );
  }

  return (
    <>
      <Wallet />
      <ContactForm />
      <ContactList />
    </>
  );
};
