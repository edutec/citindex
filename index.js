/*  ===========================================================
 *  CitIndex - Indexing Module
 *  ===========================================================
 *  date: 	16/12/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  Lets you index files of any of the following filetypes:
 *  	- PDF
 *  	- DOC
 *  	- DOCX
 *
 *  Public functions
 *  ****************
 *
 *  index(projectString, dataTypeString, filePathString,
 *  	callback(successBoolean, idString))
 *
 */

module.exports = {
	index: 
		function(project, dataType, filePath, callback) { 
			privateIndex(project, dataType, filePath, callback);
		}
}


// Indexing Mechanism

var request = require('request');
var extractor = require('./extract');


function privateIndex(project, dataType, filePath, callback) {
	extractor.extract(filePath, function(content, title) {
		generateIndex(content, title, callback) // ← function(success, id)
	})
}


// Index Generation

function generateIndex(content, title, callback) {

	var jsonData = { 
		title: title,
		tags: tags,
		path: filePath,
		content: content
	};

	var requestOptions = {
		uri: 'http://localhost:9200/' + project + '/' + dataType + '/',
		method: 'POST',
		json: jsonData
	};

	request(requestOptions, function(err, response, responseBody) {
		if (err) throw err;
		callback(true, responseBody._id)
	});
}


// Command line usage with arguments support

var project;
var dataType;
var tags = [];
var filePath;

process.argv.forEach( function(value, i, array) {
	
	var argument = value.split('=');
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--project': case '-p':
				project = argument[1];
				break;
			case '--datatype': case '-d':
				dataType = argument[1];
				break;
			case '--tags': case '-t':
				tags = argument[1].split(',');
				break;
			case '--file': case '-f':
				filePath = argument[1];
				break;
		}
	}

	if (project && dataType && filePath) {
		privateIndex(project, dataType, filePath, function(success, id) { 
			if(success) { 
				console.log(id)
			} else {
				console.log('File ' + filePath + ' could not be indexed')
			}
		}) 
	}

});


