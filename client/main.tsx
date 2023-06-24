import React from 'react';
import { createRoot } from 'react-dom/client';

import { Meteor } from 'meteor/meteor';

import { App } from '/ui/App';

import '../api/methods/contactsMethods';
import '../api/methods/transactionMethods';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container!);
  root.render(<App />);
});
