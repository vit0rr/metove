import { Meteor } from 'meteor/meteor';

import { WalletsCollection } from '/db/WalletsCollection';

import '../db/ContactsCollection';
import '../db/TransactionsCollection';
import '../db/WalletsCollection';

import '../api/methods/contactsMethods';
import '../api/methods/transactionMethods';

import '../api/publications/contactsPublications';
import '../api/publications/walletsPublications';

import '../infra/CustomError';

Meteor.startup(async () => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
