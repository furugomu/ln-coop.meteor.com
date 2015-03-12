"use strict";

Meteor.publish("areas", function(area_id) {
  var conditions = {};
  if (area_id) conditions.area_id = area_id|0;
  return Areas.find(conditions, {sort: {area_id: 1}, reactive: false});
});

Meteor.publish("messages", function(area_id, stage_id) {
  var conditions = {};
  if (area_id) conditions.area_id = area_id|0;
  if (stage_id) conditions.stage_id = stage_id|0;
  return Messages.find(conditions, {sort: {created_at: -1}});
});

Messages.allow({
  insert: function(userId, message) {
    return true;
  }
});

// 古いのを消す
Meteor.setInterval(function() {
  var expire = 30; // minutes
  Messages.remove({created_at: {$lt: Date.now() - expire * 60 * 1000}});
}, 60 * 1000);

Meteor.startup(function () {
  // code to run on server at startup
  Areas.remove({});
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
  Areas.insert({area_id: 8, name: '王家の試練 Lv8', stages: [
    {stage_id: 1, name: 'ステージ1'},
    {stage_id: 2, name: 'ステージ2'},
    {stage_id: 3, name: 'ステージ3'},
    {stage_id: 4, name: 'ステージ4'},
    {stage_id: 5, name: 'ステージ5'},
  ]});
  Areas.insert({area_id: 9, name: '王家の試練 Lv9', stages: [
    {stage_id: 1, name: 'ステージ1'},
    {stage_id: 2, name: 'ステージ2'},
    {stage_id: 3, name: 'ステージ3'},
    {stage_id: 4, name: 'ステージ4'},
    {stage_id: 5, name: 'ステージ5'},
  ]});
});
