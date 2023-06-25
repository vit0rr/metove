import { Meteor } from 'meteor/meteor';

import { Roles } from 'meteor/alanning:roles';

export const WalletsRoles = {
  ADMIN: 'admin',
};

Roles.createRole(WalletsRoles.ADMIN, {unlessExists: true});

Meteor.startup(() => {
  const user = Meteor.users.findOne({ email: 'vi.souza.almeida@protonmail.com' });
  if (!user || Roles.userIsInRole(user._id, WalletsRoles.ADMIN)) {
    return;
  }

  Roles.addUsersToRoles(user._id, WalletsRoles.ADMIN);
});
