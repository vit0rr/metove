import React from 'react';

// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { Modal } from './components/Modal';
import { SelectContact } from './components/SelectContact';
import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../db/ContactsCollection';
import { Loading } from './components/Loading';
import { WalletsCollection } from '../db/WalletsCollection';

export const Wallet = () => {
  const { contacts, wallet, isLoadingContacts, isLoadingWallets } = useTracker(() => {
    const noDataAvailableContacts = { contacts: [] };
    const noDataAvailableWallets = { wallets: [] };

    const handlerContacts = Meteor.subscribe('contacts');
    const handlerWallets = Meteor.subscribe('wallets');

    const isLoadingContacts = !handlerContacts.ready();
    if (!handlerContacts.ready()) {
      return { ...noDataAvailableContacts, isLoadingContacts };
    }

    const isLoadingWallets = !handlerWallets.ready();
    if (!handlerWallets.ready()) {
      return { ...noDataAvailableWallets, isLoadingWallets };
    }

    const contacts = ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    const [wallet] = WalletsCollection.find().fetch();

    return { contacts, wallet, isLoadingContacts, isLoadingWallets };
  });

  const [open, setOpen] = React.useState(false);
  const [isTransferring, setIsTransferring] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [destinationWallet, setDestinationWallet] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  const addTransaction = () => {
    Meteor.call(
      'transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet._id,
        destinationWalletId: destinationWallet?.walletId || '',
        amount: Number(amount),
      },
      (errorResponse) => {
        if (errorResponse) {
          errorResponse.details?.forEach((error) => {
            setErrorMessage(error.message);
          });
        } else {
          setOpen(false);
          // TODO: create a function to clear the form
          setDestinationWallet({});
          setAmount(0);
          setErrorMessage('');
        }
      },
    );
  };

  if (isLoadingContacts) {
    return <Loading />;
  }

  if (isLoadingWallets) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500">Main account</div>
            <div className="w-full flex-none text-sm font-medium text-gray-700 mt-2">Wallet ID: </div>
            <h1 className="flex-auto text-lg font-semibold text-gray-900">{wallet._id}</h1>
            <div className="text-lg font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        title={isTransferring ? 'Transfer money' : 'Add money'}
        body={
          <>
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  title={'Destination wallet'}
                  contacts={contacts}
                  contact={destinationWallet}
                  setContact={setDestinationWallet}
                />
              </div>
            )}

            <div className="mt-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.0"
              />
            </div>
          </>
        }
        footer={
          <>
            <button
              type="button"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={addTransaction}
            >
              {isTransferring ? 'Transfer' : 'Add'}
            </button>
          </>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};
