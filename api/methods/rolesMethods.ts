import { Meteor } from 'meteor/meteor';
import { WalletsRoles } from '../../infra/Roles';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'roles.isAdmin'() {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return Roles.userIsInRole(userId, WalletsRoles.ADMIN);
  },
});
