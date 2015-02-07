var transformTools = require('browserify-transform-tools');
var graspify = require('..');
var rfile = require('rfile');
var path = require('path');
var assert = require('assert');

describe('Graspify', function(){
	it('should work', function(){
		var filePath = path.resolve(__dirname, './fixture/1.js');
		var content = rfile(filePath);

		transformTools.runTransform(
			graspify,
			filePath,
			{content: content},
			function(err, transformed) {
				if (err) throw err;

				console.log(transformed)
				// assert.equal(transformed, properContent);
				// Verify transformed is what we expect...
			}
		);
	});
});