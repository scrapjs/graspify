/**
 * a clone from https://www.npmjs.com/package/graspify
 *
 */
var grasp = require('grasp');
var transformTools = require('browserify-transform-tools');

var options = {
	jsFilesOnly: true
};

module.exports = transformTools.makeStringTransform("graspify", options,
	function (content, opts, done) {
		try {
            var patterns = opts.opts && opts.opts.patterns || [];
            if (typeof patterns[0] === 'string') {
                patterns = [patterns];
            }
            patterns.forEach(function(args){
				content = grasp.replace.apply(grasp, ['equery'].concat(args, content).slice(-4));
			});

			done(null, content);
		} catch (e) {
			done(e);
		}

	}
);
