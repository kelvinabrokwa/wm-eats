#!/usr/bin/env node

var fs = require('fs');
var express = require('express');
var app = express();

app.get('/caf', function caf(req, res) {
  var data = JSON.parse(fs.readFileSync('./caf.json'));
  res.send(data);
});
app.get('/sadler', function sadler(req, res) {
  var data = JSON.parse(fs.readFileSync('./sadler.json'));
  res.send(data);
});
app.listen(3000, function() {
  console.log('WM Eats server listening on port:', 3000);
});
