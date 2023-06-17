import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { WalletsCollection } from '/imports/db/WalletsCollection';

import '../imports/db/ContactsCollection';
import '../imports/db/TransactionsCollection';
import '../imports/db/WalletsCollection';

import '../imports/api/methods/contactsMethods';
import '../imports/api/methods/transactionMethods';

import '../imports/api/publications/contactsPublications';
import '../imports/api/publications/walletsPublications';

import '../infra/CustomError';

Meteor.startup(async () => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
