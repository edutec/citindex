/*  ===========================================================
 *  CitIndex - Main Module
 *  ===========================================================
 *  date: 	10/01/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *
 */


var request = require('request');

function clearDatabase(callback) {

	var requestOptions = {
		uri: 'http://localhost:9200/_all',
		method: 'DELETE',
	};

	request(requestOptions, function(err, response, responseBody) {
		if (err) throw err;
		callback(JSON.parse(responseBody).ok);
	});
}


function initializeDatabase() {

	['sys.system'].forEach( function(value, index, array) {
	
		var requestOptions = {
			uri: 'http://localhost:9200/' + value,
			method: 'PUT',
		};

		request(requestOptions, function(err, response, responseBody) {
			if (err) throw err;
		});
	
	})
	
}


// Command line usage with arguments support

var project;
var username;
var tags = [];
var filePath;

process.argv.forEach( function(value, index, array) {
	
	var argument = value.split('=');
	if (argument.length == 1) {
		switch(argument[0]) {
			case '--clear-database': 
				clearDatabase( function(success) {
					if (success) { 
						console.log('Database was successfully cleared.')
				} else { 
						console.log('ERROR! Database could not be cleared!')
					}
				})
				break;
			case '--initialize': case '-i':
				clearDatabase( function(success) {
					if (success) {
						initializeDatabase();
						console.log('Database initialized. All indices created')
					} else {
						console.log('ERROR! Database could not be cleared, so I could not initialize it')
					}
				} )
				break;
		}
	}

});

