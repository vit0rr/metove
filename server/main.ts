import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { WalletsCollection } from '/imports/db/WalletsCollection';

import '../imports/db/ContactsCollection';
import '../imports/db/TransactionsCollection';
import '../imports/db/WalletsCollection';

import '../imports/api/contactsMethods';
import '../imports/api/transactionMethods';

import '../imports/api/contactsPublications';
import '../imports/api/walletsPublications';

import '../infra/CustomError';

const walletSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ['USD', 'EUR'],
    defaultValue: 'USD',
  },
  createdAt: {
    type: Date,
  },
});

Meteor.startup(async () => {
  if (!WalletsCollection.find().count()) {
    const walletDate = {
      createdAt: new Date(),
    };
    const cleanWallet = walletSchema.clean(walletDate);
    walletSchema.validate(cleanWallet);
    WalletsCollection.insert(cleanWallet);
  }
});
