module.exports = function(app) {
  if (typeof global.DO_NOT_AUTOUPDATE !== 'undefined' && global.DO_NOT_AUTOUPDATE) {
    console.log("(skipping autoupdate)");
    return
  }
  let ds = app.dataSources.pgsql
  if (ds.connected) {
    ds.autoupdate(null, function(err) {
      if (err) throw err
    })
  } else {
    ds.once('connected', () => ds.autoupdate(null, function(err) {
      if (err) throw err
    }))
  }
}
