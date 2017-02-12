"use strict";
let request = require('request');

let options = require('./requests/course-confirmation-report.js');
let parser = require('./parsers/details.js');

module.exports = function(req, res){
	if(req.session.jar){
		req.log.info("authorized user");
		options.headers['Cookie'] = req.session.jar;
		request(options, function(error, response, body){
				if(!error){
					req.log.info("details request successful");
					res.send(parser(body));
				}else{
					req.log.info("details request failed");
					req.log.error(error);
					res.send("Error fetching details!");
				}
			}
		);
	}else{
		req.log.info("unauthorized user");
		res.sendStatus(404);
	}
};
