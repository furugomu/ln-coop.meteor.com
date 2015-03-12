this.Messages = new Mongo.Collection("messages");
this.Areas = new Mongo.Collection("areas");

if (Meteor.isClient) {
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
}

if (Meteor.isServer) {
  Meteor.publish("areas", function(area_id) {
    var conditions = {};
    if (area_id) conditions.area_id = area_id|0;
    return Areas.find(conditions);
  });
  Meteor.publish("messages", function(area_id, stage_id) {
    var expires = 30; // minutes
    var conditions = {
      created_at: {$gt: expires * 60 * 1000},
    }
    if (area_id) conditions.area_id = area_id|0;
    if (stage_id) conditions.stage_id = stage_id|0;
    return Messages.find(conditions);
  });

  Meteor.startup(function () {
    // code to run on server at startup
    if (Areas.find().count() === 0) {
      Areas.insert({area_id: 1, name: '王家の試練 Lv1', stages: [
        {stage_id: 1, name: '一の試し'},
        {stage_id: 2, name: '二の試し'},
        {stage_id: 3, name: '三の試し'},
        {stage_id: 4, name: '鉄の試し'},
      ]});
      Areas.insert({area_id: 2, name: '王家の試練 Lv2', stages: [
        {stage_id: 1, name: '四の試し'},
        {stage_id: 2, name: '五の試し'},
        {stage_id: 3, name: '六の試し'},
        {stage_id: 4, name: '虫の試し'},
      ]});
      Areas.insert({area_id: 3, name: '王家の試練 Lv3', stages: [
        {stage_id: 1, name: '七の試し'},
        {stage_id: 2, name: '真・鉄の試し'},
        {stage_id: 3, name: '八の試し'},
        {stage_id: 4, name: '真・虫の試し'},
      ]});
      Areas.insert({area_id: 4, name: '王家の試練 Lv4', stages: [
        {stage_id: 1, name: '火の試し'},
        {stage_id: 2, name: '炎の試し'},
        {stage_id: 3, name: '紅の試し'},
      ]});
      Areas.insert({area_id: 5, name: '王家の試練 Lv5', stages: [
        {stage_id: 1, name: '氷の試し'},
        {stage_id: 2, name: '凍の試し'},
        {stage_id: 3, name: '蒼の試し'},
      ]});
      Areas.insert({area_id: 6, name: '王家の試練 Lv6', stages: [
        {stage_id: 1, name: '風の試し'},
        {stage_id: 2, name: '嵐の試し'},
        {stage_id: 3, name: '碧の試し'},
      ]});
      Areas.insert({area_id: 7, name: '王家の試練 Lv7', stages: [
        {stage_id: 1, name: '九の試し'},
        {stage_id: 2, name: '十の試し'},
        {stage_id: 3, name: '十一の試し'},
        {stage_id: 4, name: '十二の試し'},
        {stage_id: 5, name: '極・鉄の試し'},
      ]});
    }
  });
}
