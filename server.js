#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const getData = require('./get_data');

const PORT = process.env.PORT || 3000;

var app = express();

/**
 * Middleware
 */
app.use(express.static('.')); // serve files
app.use(cors()); // enable CORS
app.use(morgan('combined')); // logging

var caf = null;
var sadler = null;

var lastCafFetch = new Date();
var lastSadlerFetch = new Date();

app.get('/caf', (req, res) => {
  if (!caf || !currentData(lastCafFetch)) {
    getData('caf')
      .then(data => {
        lastCafFetch = new Date();
        caf = data;
        res.send(caf);
      })
      .catch(err => console.log(err));
  }
  else {
    res.send(caf);
  }
});

app.get('/sadler', (req, res) => {
  if (!sadler || !currentData(lastSadlerFetch)) {
    getData('sadler')
      .then(data => {
        lastSadlerFetch = new Date();
        sadler = data;
        res.send(sadler);
      })
      .catch(err => console.log(err));
  }
  else {
    res.send(sadler);
  }
});

function currentData(last) {
  today = new Date();
  return today.getDate() === last.getDate() &&
         today.getMonth() === last.getMonth() &&
         today.getFullYear() === last.getFullYear();
};

app.listen(PORT, function() {
  console.log('---------------------------------------');
  console.log('WM Eats server listening on port:', PORT);
  console.log('---------------------------------------');
});
