// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');

global.DO_NOT_AUTOUPDATE = true;

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.pgsql;

if (ds.connected) {
  ds.automigrate(null, function(err) {
    if (err) throw err;
    console.log("Migration complete.");
    process.exit();
  });
} else {
  ds.once('connected', function() {
    ds.automigrate(null, function(err) {
      if (err) throw err;
      console.log("Migration complete.");
      process.exit();
    });
  });
}
