import { Accounts } from 'meteor/accounts-base';
import { WalletsCollection } from '../db/WalletsCollection';

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  WalletsCollection.insert({
    createdAt: new Date(),
    userId: customizedUser._id,
  });

  customizedUser.email = user.emails[0].address;
  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.protection,
  email: 1,
});
