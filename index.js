var transformTools = require('browserify-transform-tools');

var options = {
	// jsFilesOnly: true
};

module.exports = transformTools.makeStringTransform("graspify", options,
	function (content, opts, done) {
		var file = opts.file;

		// if(!transformOptions.config) {
		// 	return done(new Error("Could not find graspify configuration."));
		// }

		content = content.replace(/require\([^\)]*\)/g, '123');

		done(null, content + ';;;');
	}
);