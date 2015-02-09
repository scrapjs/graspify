var transformTools = require('browserify-transform-tools');
var graspify = require('..');
var rfile = require('rfile');
var path = require('path');
var assert = require('assert');
var browserify = require('browserify');


describe('Cases', function(){
	it('reading options', function(done){
		var file = path.resolve(__dirname, './case/aliasify.js');
		graspify.setConfig([
			['require("./2")', 'require("./2-stub")']
		]);

		var b = browserify();
		b.add(file);
		b.transform(graspify, [
			["require('./2.js')", "require('./2-stub.js')"]
		]);

		b.bundle(function(err, src) {
			if (err) throw err;
			// process.stdout.write(src);
			done();
		});
	});

	it('aliasify', function(){
		var file = path.resolve(__dirname, './case/aliasify.js');
		var content = rfile(file);

		graspify.setConfig([
			["require('./2')", "require('./3')"],
			["require('./2.js')", "require('./3')"]
		]);

		transformTools.runTransform(
			graspify,
			file,
			{content: content},
			function(err, transformed) {
				if (err) throw err;

				assert.equal(transformed, "var x = require('./3');");
			}
		);
	});
});