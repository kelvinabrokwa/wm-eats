const jsdom = require('jsdom');
const Promise = require('promise');

module.exports = url => new Promise((resolve, reject) => {
  jsdom.env({
    url: url,
    scripts: ['http://code.jquery.com/jquery.js'],
    done: (err, window) => {
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

const getToday = () => [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
][(new Date()).getDay()]
