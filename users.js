/*  ===========================================================
 *  CitIndex - Users Module
 *  ===========================================================
 *  date: 	08/01/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  User management module
 *
 *  Public functions
 *  ****************
 *
 *  addUser(usernameString, firstNameString, surnameString,
 *  		passwordMD5hash, callback)
 *
 */

module.exports = {
	add: 
		function(username, firstName, surname, password, callback) { 
			add(username, firstName, surname, password, callback)
		}
}

var request = require('request');
var http = require('http');

// Adding users

function add(username, firstName, surname, passwordHash, callback) {

	// We first confirm no user with this username already exists
	
	searchByUsername(username, function(users) {
		if (users.length == 0) {
			primitiveAdd(username, firstName, surname, passwordHash, callback) 
		} else {
			callback(false, 'A user with this username already exists!')
		}
	});

	function primitiveAdd(username, firstName, surname, passwordHash, callback) {

		var jsonData = { 
			username: username,
			firstName: firstName,
			surname: surname,
			password: passwordHash
		};

		var requestOptions = {
			uri: 'http://localhost:9200/sys.system/sys.user/',
			method: 'POST',
			json: jsonData
		};

		request(requestOptions, function(err, response, responseBody) {
			if (err) throw err;
			callback(true, responseBody._id)
	})};
}


// Searching for users

function searchByUsername(username, callback) {

	options = {
		host: 'localhost',
		port: '9200',
		path: 'sys.system/sys.user/_search?q=username:' + username,
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

var username;
var firstName;
var surname;
var password;

process.argv.forEach( function(value, index, array) {

	var argument = value.split('=');
	
	if (argument.length == 2) {
		switch(argument[0]) {
			case '--search-username': case '-u':
				username = argument[1];
				break;
			case '--add': case '-a':
				username = argument[1];
				break;
			case '--firstName': case '-f':
				firstName = argument[1];
				break;
			case '--surname': case '-s':
				surname = argument[1];
				break;
			case '--password': case '-p':
				password = argument[1];
				break;
		}
	}
	
	if (index == array.length - 1) {

		if (username && firstName && surname && password) {
			var crypto = require('crypto');
			var passwordHash = crypto.createHash('md5').update(password).digest('hex');
			add(username, firstName, surname, passwordHash, function(success, response) {
				if (success) {
					console.log('Added user with username ' + username + '.')
				} else {
					console.log(response)
				}
			})
		} else if (username) {
			searchByUsername(username, function(response) { 
				console.log(response) 
			}) 
		}

	}
});


