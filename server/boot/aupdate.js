module.exports = function(app) {
  var ds = app.dataSources.mysql;
  if(ds.connected) {
    ds.autoupdate();
  } else {
    ds.once('connected', function() {
      ds.autoupdate();
    });
  }
};
;
