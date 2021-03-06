var express = require('express');
var app = module.exports.app = exports.app = express();
var mongoose = require('mongoose');
var Puid = require('puid');


var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.text()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

mongoose.connect('mongodb://localhost:27017/test');

app.post('/api/bulk', function(req, res){
  console.log('POST /api/bulk');
  var puid = new Puid();
  var id = puid.generate();

  if (mongoose.get(id)){
    return res.status(400).end();
  }

  mongoose.set(id, req.body);
  res.json({id: id}).status(203).end();
});

app.get('/api/bulk/:id', function(req, res){
  console.log('GET /api/bulk/' + req.params.id);
  var id = req.params.id;
  var bulkData = mongoose.get(id);
  if (!mongoose.get(id)){
    return res.status(404).end();
  }
  res.json(bulkData).end();
});

app.put('/api/bulk/:id', function(req, res){
  console.log('PUT:' + req.params.id);
  var id = req.params.id;
  if (!mongoose.get(id)){
    return res.status(404).end();
  }
  console.log(req.body);
  mongoose.set(id, req.body);
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
