/*  ===========================================================
 *  CitIndex - WebApp Module
 *  ===========================================================
 *  date: 	16/12/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  WebApp that lets you upload and index documents by their
 *  content, if the filetype is suported, and by tags and title
 *  in any case.
 *
 *  Documents are also classified by project, and a permission
 *  system controls who can upload and search for what.
 *
 *  
 *  Entry Points
 *  ************
 *
 *  /
 *  Root entry point. Displays the main page.
 *
 */

searchEngine = require('./search');
indexer = require('./index');
//searchEngine.search('canbus','datasheet','microcontrollers', function(response) { console.log(response) })

var express = require('express');
var app = express();

app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/docs', express.static(__dirname + '/docs'));
app.use('/', express.static(__dirname + '/amber'));

app.get('/', function(request, response){
	response.render('index.ejs')
});

app.get('/search/:project/:datatype/:query',function (request, response) {
	searchEngine.search(request.params.project, request.params.datatype, request.params.query, function(results) {
		console.log(results);
		response.send(results);
	})
});

app.listen(8080)
