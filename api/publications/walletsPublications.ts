import { Meteor } from 'meteor/meteor';
import { WalletsCollection } from '../../db/WalletsCollection';

Meteor.publish('myWallet', function publishWallets() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error('Not authorized.');
  }

  return WalletsCollection.find({ userId });
});
