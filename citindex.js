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

var app = require('express')();

app.get('/', function(request, response){
	response.render('index.ejs')
});

app.get('/search/:project/:datatype/:query',function (request, response) {
	searchEngine.search(request.params.project, request.params.datatype, request.params.query, function(results) {
		console.log(results);
		response.render('search-results.ejs', { results: results })
	})
});

app.listen(8080)
