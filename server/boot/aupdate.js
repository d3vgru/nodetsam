module.exports = function(app) {
  let ds = app.dataSources.mysql
  if(ds.connected) {
    ds.autoupdate()
  } else {
    ds.once('connected', () => ds.autoupdate())
  }
}
