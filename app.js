/**
 * Created by raiym on 11/30/15.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bicycleCtrl = require('./controllers/bicycle');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json('hello world');
});

app.post('/bicycle', bicycleCtrl.create);
app.get('/bicycle/:latitude/:longitude', bicycleCtrl.get);
app.get('/parse', bicycleCtrl.parse);
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {

    console.log('Example app listening on port %d', port);
});