'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

// Enable babel transpiler
require('babel-core/register');
require('./config.es6');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  app.dataSources.mysql.automigrate();
  console.log("Performed automigration.");
  process.exit();
});

