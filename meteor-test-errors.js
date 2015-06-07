// Add one extra line to the stack
function indirectThrow (type, message) {
  Session.set('helper-error-type', null);
  Session.set('tracker-error-type', null);
  throw new type(message);
}

if (Meteor.isClient) {
  Template.pitcher.helpers({
    throwHelperError: function () {
      if (Session.equals('helper-error-type', 'Meteor'))
        indirectThrow(Meteor.Error, 'Meteor thrown from a helper');
      else if (Session.equals('helper-error-type', 'regular'))
        indirectThrow(Error, 'Regular thrown from a helper');
    }
  });

  Template.pitcher.events({
    'click #meteor-error-event': function () {
      indirectThrow(Meteor.Error, 'Meteor thrown from an event handler');
    },

    'click #regular-error-event': function () {
      indirectThrow(Error, 'Regular thrown from an event handler');
    },

    'click #meteor-error-helper': function () {
      Session.set('helper-error-type', 'Meteor');
    },

    'click #regular-error-helper': function () {
      Session.set('helper-error-type', 'regular');
    },

    'click #meteor-error-tracker': function () {
      Session.set('tracker-error-type', 'Meteor');
    },

    'click #regular-error-tracker': function () {
      Session.set('tracker-error-type', 'regular');
    }
  });

  Tracker.autorun(function () {
      if (Session.equals('tracker-error-type', 'Meteor'))
        indirectThrow(Meteor.Error, 'Meteor thrown from autorun');
      else if (Session.equals('tracker-error-type', 'regular'))
        indirectThrow(Error, 'Regular thrown from autorun');
    }
  );
}
