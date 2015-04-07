var express = require('express');
var app = module.exports.app = exports.app = express();

// static files
app.use('/', express.static('build'));

var server = app.listen(process.env.PORT || 3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('server start at http://%s:%s', host, port);
});
