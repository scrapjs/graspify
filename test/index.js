var transformTools = require('browserify-transform-tools');
var graspify = require('..');
var rfile = require('rfile');
var path = require('path');
var assert = require('assert');
var browserify = require('browserify');


describe('Cases', function(){
	it.only('reading options', function(done){
		var file = path.resolve(__dirname, './case/aliasify.js');
		graspify.setConfig([
			['require("./2")', 'require("./2-stub")']
		]);

		var b = browserify();
		b.add(file);
		b.transform(graspify, [
			["require('./2.js')", "require('./2-stub.js')"]
		]);


		//Run transform for all deps
		b.bundle(function(err, src) {
			if (err) throw err;
			process.stdout.write(src);
			done();
		});
	});

	it.skip('aliasify', function(done){
		var content = rfile(file);

		graspify.setConfig({
			"replace": {
				"require('./2')": "require('./2-stub')",
				"require('./2.js')": "require('./2-stub')"
			}
		});

		var b = browserify();
		b.add(file);
		b.transform(graspify);

		//Run transform for all deps
		b.bundle(function(err, src) {
			process.stdout.write(src);
			done();
		});


		//Run transform for a single module
		// transformTools.runTransform(
		// 	graspify,
		// 	file,
		// 	{content: content},
		// 	function(err, transformed) {
		// 		if (err) throw err;

		// 		assert.equal(transformed, "var x = require('./3');");
		// 	}
		// );
	});
});