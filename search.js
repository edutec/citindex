/*  ===========================================================
 *  CitIndex - Search Module
 *  ===========================================================
 *  date: 	16/12/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  Lets you search inside the local ElasticSearch
 *  server by project, datatype and query string. Returns an
 *  array with the file paths of all matching files.
 *
 *  Public functions
 *  ****************
 *
 *  search(projectString, dataTypeString, queryString)
 *
 */

module.exports = {
	search: 
		function(project, dataType, queryString, callback) { 
			search(project, dataType, queryString, callback);
		}
}


// Search mechanism

var http = require('http');

function search(project, dataType, queryString, callback) {

	options = {
		host: 'localhost',
		port: '9200',
		path: project + '/' + dataType + '/_search?q=content:' + queryString + '&fields=path',
		method: 'GET'
	}

	http.get(options, function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {
			jsonData = JSON.parse(data);
			callback(jsonData.hits.hits)
		})
	})

}



// Command line usage with arguments support

var project;
var dataType;
var queryString;

process.argv.forEach( function(value, index, array) {

	var argument = value.split('=');
	
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--project': case '-p':
				project = argument[1];
				break;
			case '--datatype': case '-d':
				dataType = argument[1];
				break;
			case '--query': case '-q':
				queryString = argument[1];
				break;
		}
	}

	if (project && dataType && queryString) {
		search(project, dataType, queryString, function(response) { 
			console.log(response) 
		}) 
	}

});

