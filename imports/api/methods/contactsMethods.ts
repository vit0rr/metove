import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ContactsCollection } from '../../db/ContactsCollection';

Meteor.methods({
  'contacts.insert'(name: string, email: string, imageUrl: string, walletId: string) {
    check(name, String);
    check(email, String);
    check(walletId, String);

    if (!name) {
      throw new Meteor.Error('Name is required');
    }

    if (!email) {
      throw new Meteor.Error('Email is required');
    }

    if (!walletId) {
      throw new Meteor.Error('Wallet ID is required');
    }

    ContactsCollection.insert({
      name,
      email,
      imageUrl,
      walletId,
      createdAt: new Date(),
    });
  },
  'contacts.remove'(contactId: string) {
    check(contactId, String);

    ContactsCollection.remove(contactId);
  },
});
