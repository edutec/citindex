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
 *  index(projectString, usernameString, filePathString,
 *  	callback(successBoolean, idString))
 *
 */

module.exports = {
	index: 
		function(project, username, filePath, callback) { 
			privateIndex(project, username, filePath, callback);
		}
}


// Indexing Mechanism

var request = require('request');
var extractor = require('./extract');
var projectManager = require('./projects');
var userManager = require('./users');


function privateIndex(project, username, filePath, callback) {
	projectManager.exists(project, function(exists) {
		if (!exists) { 
			callback(false, 'Project ' + project + ' does not exist!');
			return;
		}
	});
	
	projectManager.userCanContribute(username, project, function(canContribute) {
		if (!canContribute) { 
			callback(false, 'User ' + username + ' cannot contribute to ' + project + '!');
			return;
		}
	})

	extractor.extract(filePath, function(content, title) {
		generateIndex(content, title, project, username, callback) // ← function(success, id)
	})
}


// Index Generation

function generateIndex(content, title, project, username, callback) {

	var jsonData = { 
		title: title,
		tags: tags,
		path: filePath,
		content: content
	};

	var requestOptions = {
		uri: 'http://localhost:9200/' + project + '/' + username + '/',
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
var username;
var tags = [];
var filePath;

process.argv.forEach( function(value, index, array) {
	
	var argument = value.split('=');
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--project': case '-p':
				project = argument[1];
				break;
			case '--username': case '-u':
				username = argument[1];
				break;
			case '--tags': case '-t':
				tags = argument[1].split(',');
				break;
			case '--file': case '-f':
				filePath = argument[1];
				break;
		}
	}

	if (index == array.length - 1) {

		if (project && username && filePath) {
			privateIndex(project, username, filePath, function(success, id) { 
				if(success) { 
					console.log(id)
				} else {
					console.log('File ' + filePath + ' could not be indexed')
				}
			}) 
		}
	
	}

});


