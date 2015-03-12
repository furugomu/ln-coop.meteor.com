"use strict";

Router.route('/', {
  name: 'home',
  data: function() {
    return {
      areas: Areas.find(),
    };
  },
});

Router.route('/area/:area_id',  {
  name: 'area.show',
  template: 'Area',
  data: function() {
    var params = this.params;
    return {
      area_id: params.area_id,
      area: Areas.findOne({area_id: params.area_id|0}),
      messages: Messages.find({area_id: params.area_id|0}),
    };
  },
});

Router.route('/area/:area_id/:stage_id', {
  template: 'Stage',
  data: function() {
    var params = this.params;
    var area = Areas.findOne({area_id: params.area_id|0});
    return {
      area_id: params.area_id,
      stage_id: params.stage_id,
      area: area,
      messages: Messages.find({area_id: params.area_id|0, stage_id: params.stage_id|0}),
    };
  },
});
