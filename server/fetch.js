"use strict";

// famitsu wiki からぶっこぬく

var cheerio = Meteor.npmRequire('cheerio');

//var url = 'http://wiki.famitsu.com/littlenoah/COOP%E5%8B%9F%E9%9B%86%E6%8E%B2%E7%A4%BA%E6%9D%BF';
var url = 'http://localhost:10080/coop.html';
Meteor.setInterval(function() {
  HTTP.get(url, {}, function(err, result) {
    if (err) {
      console.error(err);
      return;
    }

    console.info(result.statusCode, result.content.length);
    var $ = cheerio.load(result.content);

    $('.comment').each(function() {
      var dateString = $(this).find('.comment-create-date').text();
      var text = $(this).find('.comment-body').text().trim();

      var date = new Date(); // TODO: JST としてパースる

      var m = /\b(\d)-(\d)\b/.exec(text);
      if (!m) return;
      var areaId = m[1]|0;
      var stageId = m[2]|0;

      m = /\b(\d{5})\b/.exec(text);
      if (!m) return;
      var roomId = m[1]|0;

      return;
      Messages.insert({
        area_id: areaId,
        stage_id: stageId,
        room_id: roomId,
        created_at: date,
      });
    });
  });
}, 10000);

function parse(err, window) {
  if (err) {
    console.error(err);
    return;
  }
}
