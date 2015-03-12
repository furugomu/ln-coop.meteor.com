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
