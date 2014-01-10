/*  ===========================================================
 *  CitIndex - Projects Module
 *  ===========================================================
 *  date: 	08/01/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  Project management module
 *
 *  Public functions
 *  ****************
 *
 *  add(projectCodeString, projectDataObject, usernameString, callback)
 *  exists(projectCodeString)
 *
 */

module.exports = {
	add: 
		function(projectCode, projectData, username, callback) { 
			add(projectCode, username, callback)
		},
	exists:
		function(projectCode, callback) {
			existsWithName(projectCode, callback)
		},
	userCanContribute: 
		function(username, projectCode, callback) {
			userCanContribute(username, projectCode, callback)
		}
}

var request = require('request');
var fs = require('fs');
var http = require('http');


// Adding projects

function add(projectData, username, callback) {

	// We first confirm no project with this name already exists
	
	existsWithName(projectData.name, function(exists) {
		if (exists) {
			callback(false, 'A project with this name already exists!')
		} else {
			var crypto = require('crypto');
			var projectCode = crypto.createHash('md5').update(projectData.name).digest('hex');
			primitiveAdd(projectCode, projectData, username, callback) 
		}
	});

	function primitiveAdd(projectCode, projectData, username, callback) {

		var requestOptions = {
			uri: 'http://localhost:9200/' + projectCode + '/sys.config',
			method: 'POST',
			json: jsonData
		};

		request(requestOptions, function(err, response, responseBody) {
			if (err) throw err;
			if (responseBody.error) { 
				callback(false, responseBody) 
			} else {
				fs.mkdir( __dirname + '/docs/' + projectCode, function() {
					addUserToProject(username, projectCode, ['creator', 'admin'], function(success, message) { 
						callback(success, message)
					})
				});
			}
		})
		
	}
}


function addUserToProject(username, projectCode, roles, callback) {

	var jsonData = {
		username: username,
		roles: roles
	};

	var requestOptions = {
		uri: 'http://localhost:9200/' + projectCode + '/sys.user',
		method: 'POST',
		json: jsonData
	};

	request(requestOptions, function(err, response, responseBody) {
		if (err) throw err;
		callback(responseBody.error == undefined, responseBody)
	})

}

// Testing

function existsWithName(projectName, callback) {

	options = {
		host: 'localhost',
		port: '9200',
		path: '*/sys.config/_search?q=name:' + projectName,
		method: 'GET'
	}

	http.get(options, function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk;
		});
		response.on('end', function() {
			jsonData = JSON.parse(data);
			callback(jsonData.hits.total > 0)
		})
	})

}


function userCanContribute(username, projectCode, callback) {
	options = {
		host: 'localhost',
		port: '9200',
		path: projectCode + '/sys.user/_search?q=username:' + username,
		method: 'GET'
	}

	http.get(options, function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {
			jsonData = JSON.parse(data);
			if (jsonData.hits.total == 0) {
				callback(false)
			} else {
				callback(true)
			}
		})
	})	
}

// Command line usage with arguments support

var adding = false;
var projectData;
var username;

process.argv.forEach( function(value, index, array) {

	var argument = value.split('=');
	
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--add': case '-a':
				adding = true;
				break;
			case '--data': case '-d':
				projectData = JSON.parse(argument[1]);
				break;
			case '--username': case '-u':
				username = argument[1];
				break;
		}
	}
	
	if (index == array.length - 1) {
		if (adding && projectData && username) {
			add(projectData, username, function(success, response) {
				if (success) {
					console.log('Added project:\n' + response)
				} else {
					console.log(response)
				}
			})
		} else if (projectCode && username) {
			userCanContribute(username, projectCode, function(response) {
				console.log(response)
			})
		} else if (projectCode) {
			existsWithName(projectCode, function(response) { 
				console.log(response) 
			}) 
		}

	}
});


