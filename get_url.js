const jsdom = require('jsdom');
const Promise = require('promise');

module.exports = (hall) => new Promise((resolve, reject) => {
  var page, code;
  if (hall === 'sadler') {
    page = 'https://dining.wm.edu/dining-choices/resident/sadler.html';
    code = '3543';
  } else {
    page = 'https://dining.wm.edu/dining-choices/resident/commons-dining-hall.html';
    code = '20242';
  }
  jsdom.env({
    url: page,
    scripts: ['http://code.jquery.com/jquery.js'],
    done: (err, window) => {
      if (err) reject(err);
      var $ = window.$;
      var url = $('#accordion_' + code).find('li > a').first().attr('href');
      resolve('https://dining.wm.edu/' + url);
    }
  });
});

