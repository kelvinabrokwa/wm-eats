#!/usr/bin/env node
var getURL = require('./get_url');
var getMenu = require('./get_menu');
var fs = require('fs');

['sadler', 'caf'].forEach(function(d) {
  getURL(d)
    .then(function(url) {
      return getMenu(url);
    })
    .then(function(data) {
      fs.writeFileSync('./' + d + '.json', JSON.stringify(data));
    });
});
