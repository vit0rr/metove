import { Meteor } from 'meteor/meteor';

import { ContactsCollection } from '../db/ContactsCollection';

Meteor.methods({
  'contacts.insert'(name: string, email: string, imageUrl: string,) {
    if (!name) {
      throw new Meteor.Error('Name is required');
    }

    if (!email) {
      throw new Meteor.Error('Email is required');
    }

    if (!imageUrl) {
      throw new Meteor.Error('Image URL is required');
    }

    ContactsCollection.insert({
      name,
      email,
      imageUrl,
      createdAt: new Date(),
    });
  },
});
