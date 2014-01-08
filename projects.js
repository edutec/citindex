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
 *
 */

module.exports = {
	addProject: 
		function(projectName, username, callback) { 
			add(projectName, username, callback)
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
	
	existsWithName(projectName, username, function(exists) {
		if (exists) {
			primitiveAdd(projectName, callback) 
		} else {
			callback(false, 'A project with this name already exists!')
		}
	});

	function primitiveAdd(projectName, username, callback) {

		var jsonData = {
			username: username,
			roles: ['creator', 'admin']
		};

		var requestOptions = {
			uri: 'http://localhost:9200/' + projectName + '/sys.users',
			method: 'POST',
			json: jsonData
		};

		request(requestOptions, function(err, response, responseBody) {
			if (err) throw err;
			callback(true, responseBody._id)
	})};
}


// Searching for projects

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


// Command line usage with arguments support

var projectName;
var username;

process.argv.forEach( function(value, index, array) {

	var argument = value.split('=');
	
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--search': case '-s':
				projectName = argument[1];
				break;
			case '--add': case '-a':
				projectName = argument[1];
				break;
			case '--username': case '-u':
				username = argument[1];
				break;
		}
	}
	if (projectName && username) {
		add(projectName, username, function(success, response) {
			if (success) {
				console.log('Added project with name ' + username + '.')
			} else {
				console.log(response)
			}
		})
	} else if (projectName) {
		existsWithName(projectName, function(response) { 
			console.log(response) 
		}) 
	}
});


