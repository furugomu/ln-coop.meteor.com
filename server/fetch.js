"use strict";

// famitsu wiki からぶっこぬく

var cheerio = Meteor.npmRequire('cheerio');

var urls = [
  'http://wiki.famitsu.com/littlenoah/COOP%E5%8B%9F%E9%9B%86%E6%8E%B2%E7%A4%BA%E6%9D%BF',
];
for (var i = 1; i <= 9; ++i) {
  urls.push('http://wiki.famitsu.com/littlenoah/COOP%E5%8B%9F%E9%9B%86%E6%8E%B2%E7%A4%BA%E6%9D%BF/%E3%82%A8%E3%83%AA%E3%82%A2'+String(i));
}

var i = 0;
Meteor.setInterval(function() {
  var url = urls[i++];
  if (i >= urls.length) i = 0;
  fetchFamitsuWiki(url);
}, 60*1000);

// ファミ通 Wiki のコメントを Messages に入れる
function fetchFamitsuWiki(url) {
  HTTP.get(url, {}, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    console.info(result.statusCode, result.content.length, url);
    parse(result.content).forEach(function (message) {
      if (Messages.findOne(message)) return;
      Messages.insert(message);
    });
  });
}

// ファミ通 Wiki の中身を見て Messages に入れる物を返す
function parse(html) {
  var $ = cheerio.load(html);
  var messages = [];

  $('.comment').each(function() {
    var dateString = $(this).find('.comment-create-date').text();
    var text = $(this).find('.comment-body').text().trim();

    // date
    var m = /(\d{4})年(\d{2})月(\d{2})日(\d{2})時(\d{2})分/.exec(dateString);
    if (!m) return;
    var time = Date.UTC(m[1], m[2]-1, m[3], m[4], m[5]);
    var jstOffset = 9 * 60 * 60 * 1000;
    time -= jstOffset;

    // area, stage
    m = /\b(\d)-(\d)\b/.exec(text);
    if (!m) return;
    var areaId = m[1]|0;
    var stageId = m[2]|0;

    // room
    m = /\b(\d{5})\b/.exec(text);
    if (!m) return;
    var roomId = m[1]|0;

    console.log(areaId, stageId, roomId, new Date(time));
    messages.push({
      area_id: areaId,
      stage_id: stageId,
      room_id: roomId,
      created_at: time,
    });
  });
  return messages;
}
