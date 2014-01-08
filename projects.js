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
 *  addProject(projectNameString, usernameString, callback)
 *  projectExists(projectNameString)
 *
 */

module.exports = {
	add: 
		function(projectName, username, callback) { 
			add(projectName, username, callback)
		},
	exists:
		function(projectName, callback) {
			existsWithName(projectName, callback)
		},
	userCanContribute: 
		function(username, projectName, callback) {
			userCanContribute(username, projectName, callback)
		}
}

var request = require('request');
var http = require('http');

// Adding projects

function add(projectName, username, callback) {

	if (projectName == 'sys.system') { 
		callback(false, "Invalid project name");
   		return;
	}
	
	// We first confirm no project with this name already exists
	
	existsWithName(projectName, function(exists) {
		if (exists) {
			callback(false, 'A project with this name already exists!')
		} else {
			primitiveAdd(projectName, username, callback) 
		}
	});

	function primitiveAdd(projectName, username, callback) {

		var jsonData = {
			username: username,
			roles: ['creator', 'admin']
		};

		var requestOptions = {
			uri: 'http://localhost:9200/' + projectName + '/sys.user',
			method: 'POST',
			json: jsonData
		};

		request(requestOptions, function(err, response, responseBody) {

			if (err) throw err;

			if (responseBody.error) { 
				callback(false, responseBody.error);
			} else {
				callback(true, responseBody._id)
			}
	})};
}


// Testing

function existsWithName(projectName, callback) {

	options = {
		host: 'localhost',
		port: '9200',
		path: projectName + '/_settings',
		method: 'GET'
	}

	http.get(options, function(response) {
		var data = '';
		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {
			jsonData = JSON.parse(data);
			if (jsonData.error) {
				callback(false)
			} else {
				callback(true)
			}
		})
	})

}

function userCanContribute(username, projectName, callback) {
	options = {
		host: 'localhost',
		port: '9200',
		path: projectName + '/sys.user/_search?q=username:' + username,
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

var projectName;
var username;
var projectNameQuery;

process.argv.forEach( function(value, index, array) {

	var argument = value.split('=');
	
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--search': case '-s':
				projectNameQuery = argument[1];
				break;
			case '--add': case '-a':
				projectName = argument[1];
				break;
			case '--username': case '-u':
				username = argument[1];
				break;
		}
	}
	
	if (index == array.length - 1) {

		if (projectName && username) {
			add(projectName, username, function(success, response) {
				if (success) {
					console.log('Added project with name ' + projectName + '.')
				} else {
					console.log(response)
				}
			})
		} else if (projectNameQuery && username) {
			userCanContribute(username, projectNameQuery, function(response) {
				console.log(response)
			})
		} else if (projectNameQuery) {
			existsWithName(projectNameQuery, function(response) { 
				console.log(response) 
			}) 
		}

	}
});


