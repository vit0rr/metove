import React, { memo } from 'react';

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';

import { ContactsCollection } from '../db/ContactsCollection';

export const ContactList = () => {
  const { contacts, isLoading } = useTracker(() => {
    const noDataAvailable = { contacts: [] };

    const handler = Meteor.subscribe('contacts');
    const isLoading = !handler.ready();
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading };
    }

    const contacts = ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();

    return { contacts, isLoading };
  });

  const removeContact = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, _id: string) => {
    e.preventDefault();
    Meteor.call('contacts.remove', _id);
  };

  const ContactItem = memo(
    ({ contact }: { contact: { name: string; email: string; imageUrl: string; walletId: string; _id: string } }) => {
      return (
        <li className="py-4 flex items-center justify-between space-x-3">
          <div className="min-w-0 flex-1 flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={contact.imageUrl} alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
              <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
              <p className="text-sm font-medium text-gray-500 truncate">{contact.walletId}</p>
            </div>
            <div>
              <a
                href=""
                onClick={(e) => removeContact(e, contact._id)}
                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              >
                Remove
              </a>
            </div>
          </div>
        </li>
      );
    },
  );

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact List</h3>
        <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {isLoading && (
            <div>
              <div className="mt-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide ">Loading...</h3>
              </div>
            </div>
          )}
          {contacts.map(
            (
              contact: { name: string; email: string; imageUrl: string; walletId: string; _id: string },
              contactIdx: string,
            ) => (
              <ContactItem key={contactIdx} contact={contact} />
            ),
          )}
        </ul>
      </div>
    </div>
  );
};
