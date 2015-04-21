var express = require('express');
var app = module.exports.app = exports.app = express();
var mongoose = require('mongoose');
var Puid = require('puid');
mongoose.connect('mongodb://localhost:27017/test');

app.post('/api/bulk', function(req, res){
  var puid = new Puid();
  var id = puid.generate();
  var bulkData = mongoose.model(id, req.body);
  console.log('POST');
  res.json({id: id}).end();
});

app.get('/api/bulk/:id', function(req, res){
  console.log('GET:' + req.params.id);
  var id = req.params.id;
  var bulkData = mongoose.get(id);
  res.json(bulkData).end();
});

app.put('/api/bulk/:id', function(req, res){
  console.log('PUT:' + req.params.id);
  var id = req.params.id;
  mongoose.model(id, req.body);
  res.end();
});


// static files
app.use('/', express.static('build'));


// API

// POST /api/datasets
// Create new dataset

// GET /api/datasets/{datasetID}
// Read the dataset

// PUT /api/datasets/{datasetID}
// Bulk Update the dataset

// DELETE /api/datasets/{datasetID}

// 以下いる？
// POST /api/datasets/{datasetID}/figures
// Add new figure to the dataset

// GET /api/datasets/{datasetID}/figures/{figureId}
// Read the figure (need?)

// PUT /api/datasets/{datasetID}/figures/{figureId}
// Update the figure

var server = app.listen(process.env.PORT || 3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('server start at http://%s:%s', host, port);
});
