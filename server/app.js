var express = require('express');
var mongoose = require('mongoose');
var app = module.exports.app = exports.app = express();

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
