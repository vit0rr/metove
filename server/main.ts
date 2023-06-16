import { Meteor } from 'meteor/meteor';
import '../imports/db/ContactsCollection';
import '../imports/db/TransactionsCollection';
import '../imports/db/WalletsCollection';
import '../imports/api/contactsMethods';
import '../imports/api/transactionMethods';
import '../imports/api/contactsPublications';
import '../imports/api/walletsPublications';
import { WalletsCollection } from '/imports/db/WalletsCollection';

Meteor.startup(async () => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      balance: 0,
      currency: 'USD',
      createdAt: new Date(),
    });
  }
});
