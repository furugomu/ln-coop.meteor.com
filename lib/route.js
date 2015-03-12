"use strict";

Router.route('/', {
  name: 'home',
  subscriptions: function() {
    this.subscribe('areas');
  },
  data: function() {
    return {
      areas: Areas.find(),
    };
  },
});

Router.route('/area/:area_id',  {
  name: 'area.show',
  template: 'Area',
  subscriptions: function() {
    this.subscribe('areas', this.params.area_id);
    this.subscribe('messages', this.params.area_id);
  },
  data: function() {
    var params = this.params;
    return {
      area_id: params.area_id,
      area: Areas.findOne(),
      messages: Messages.find(),
    };
  },
});

Router.route('/area/:area_id/:stage_id', {
  template: 'Stage',
  subscriptions: function() {
    this.subscribe('areas', this.params.area_id);
    this.subscribe('messages', this.params.area_id|0, this.params.stage_id|0);
  },
  data: function() {
    var params = this.params;
    var area = Areas.findOne();
    return {
      area_id: params.area_id,
      stage_id: params.stage_id,
      area: area,
      stage: function() { return area && area.stages[params.stage_id-1] },
      messages: Messages.find({}, {sort: {created_at: -1}}),
    };
  },
});
