/*  ===========================================================
 *  CitIndex - Data Extraction Module
 *  ===========================================================
 *  date: 	16/12/2013
 *  author: Bernat Romagosa
 *  -----------------------------------------------------------
 *
 *  Description
 *  ***********
 *
 *  Lets you extract the text contents and title of files of
 *  any of the following filetypes:
 *  	- PDF
 *  	- DOC
 *  	- DOCX
 *
 *  Public functions
 *  ****************
 *
 *  extract(filePathString, fileTypeString, 
 *  	callback(contentString, titleString))
 *
 */

module.exports = {
	extract: 
		function(filePath, callback) {
			switch (fileType(filePath)) {
				case 'pdf':
					extractPDF(filePath, callback);
					break;
				case 'doc':
					extractDOC(filePath, callback);
					break;
				case 'docx':
					extractDOCX(filePath, callback);
					break;
				default:
					console.log(filePath);
					console.log(fileType(filePath))
			}
		}
	}

var fs = require('fs');
var uuid = require('node-uuid');
var exec = require('child_process').exec;

var destinationPath = __dirname + '/tmp/' + uuid.v1() + '.txt';


// PDF Extraction

function extractPDF(filePath, callback) {
	var cmd = 'pdftotext ' + filePath + ' -enc UTF-8 ' + destinationPath;
	processCommand(cmd, filePath, callback);
}

// DOC Extraction

function extractDOC(filePath, callback) {
	var cmd = 'catdoc ' + filePath + ' -d UTF-8 > ' + destinationPath;
	processCommand(cmd, filePath, callback);
};

// DOCX Extraction

function extractDOCX(filePath, callback) {
	var cmd = 'docx2txt < ' + filePath + ' > ' + destinationPath;
	processCommand(cmd, filePath, callback);
};


// Exec mechanism

function processCommand(cmd, filePath, callback){
	exec(cmd, function (err, stderr, stdout) {
		if (err) throw err;

		fs.readFile(destinationPath, {encoding: 'utf-8'}, function(err, data){
			if (err) throw err;

			callback(data, fileName(filePath));

			fs.unlink(destinationPath, function (err) {
  				if (err) throw err;
			})

		})
	})
}


// Filetype enquiry

// Not really clean yet, just checks for file extensions instead
// of mime-types inside the file. It'd take importing another module
// such as https://github.com/mscdex/mmmagic
// Would this be overkill?

function fileType(filePath) {
	return filePath.split('.').pop().toLowerCase()
}

function fileName(filePath) {
	return filePath.split('/').pop();
}


