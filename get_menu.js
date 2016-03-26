var jsdom = require('jsdom');
var Promise = require('promise');

module.exports = function(url) {
  return new Promise(function(resolve, reject) {
    jsdom.env({
      url: url,
      scripts: ['http://code.jquery.com/jquery.js'],
      done: function(err, window) {
        if (err) reject(err);
        var $ = window.$;
        var today = getToday();
        var dayOuter = $('td#' + today + '.dayouter');
        var dayInner = $('table.dayinner > tbody', dayOuter);
        var data = [];
        var mealName;
        var station;
        dayInner.children().each(function() {
          var tr = $(this);
          if ($('td.mealname', tr).length) {
            mealName = $('td.mealname', tr).text().trim();
            return;
          }
          var s = $('td.station', tr).text().trim();
          if (s.length > 1) station = s;
          var meal = $('span.ul', tr).text().trim();
          if (meal) {
            data.push({
              mealName: mealName,
              station: station,
              meal: meal
            });
          }
        });
        resolve(data);
      }
    });
  });
};

function getToday() {
  return ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][(new Date()).getDay()];
}
