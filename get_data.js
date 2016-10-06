#!/usr/bin/env node

const getURL = require('./get_url');
const getMenu = require('./get_menu');

module.exports = hall => getURL(hall)
    .then(url => getMenu(url));