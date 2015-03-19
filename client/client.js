"use strict";

Template.form.events({
  submit: function(e) {
    e.preventDefault();
    var form = e.target;
    Messages.insert({
      area_id: form.area_id.value|0,
      stage_id: form.stage_id.value|0,
      room_id: form.room_id.value.substring(0, 5),
      created_at: Date.now(),
    });
    form.reset();
  },
});

Template.messages.events({
  "click .delete": function(event) {
    console.log('delete', this);
    var button = event.target;
    var id = button.getAttribute('data-id');
    Messages.remove(id);
  }
});

Template.messages.helpers({
  time: function(t) {
    return moment(t).fromNow();
  },
});

var timer = null;
Template.messages.rendered = function() {
  var template = this;
  timer = Meteor.setInterval(function() {
    template.findAll('[data-time]').forEach(function(el) {
      el.textContent = moment(+el.dataset.time).fromNow();
    });
  }, 10000);
}

Template.messages.destroyed = function() {
  if (timer) Meteor.clearInterval(timer);
}
