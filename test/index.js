var transformTools = require('browserify-transform-tools');
var graspify = require('..');
var rfile = require('rfile');
var path = require('path');
var assert = require('assert');

describe('Graspify cases', function(){
	it('aliasify', function(){
		var filePath = path.resolve(__dirname, './example/aliasify.js');
		var content = rfile(filePath);

		graspify.setConfig({
			"replace": {
				"require('./2')": "require('./3')",
				"require('./2.js')": "require('./3')"
			}
		});

		transformTools.runTransform(
			graspify,
			filePath,
			{content: content},
			function(err, transformed) {
				if (err) throw err;

				assert.equal(transformed, "var x = require('./3');")
				// assert.equal(transformed, properContent);
				// Verify transformed is what we expect...
			}
		);
	});
});