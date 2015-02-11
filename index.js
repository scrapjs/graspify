var grasp = require('grasp');
var transformTools = require('browserify-transform-tools');

var options = {
	jsFilesOnly: true
};


/**
 * String transform is called per-module.
 * In that, as many `require` calls you have, that many times it is called.
 * If you replace `require` call, transform for that module won’t be called.
 *
 * Transform can be called globally as `browserify -g graspify`.
 * In that case transform is called for each nested module as well,
 * getting global config, defined in package.json.
 *
 * `opts.config` is taken from package.json, can be whether object or array.
 * `opts.opts` is taken as browserify transform param.
 */
module.exports = transformTools.makeStringTransform("graspify", options,
	function (content, opts, done) {
		try {
			//normalize plain replacements
			if (opts.opts && typeof opts.opts[0] === 'string') {
				opts.opts = [opts.opts];
			}
			if (opts.config && typeof opts.config[0] === 'string') {
				opts.config = [opts.config];
			}

			//merge opts & config for the full list of replacements
			[].concat(opts.opts || [], opts.config || [])

			//apply each replacement
			.forEach(function(args){
				var selectorType = args.length === 3 ? args.shift() : 'equery';
				var selector = args[0];
				var replacement = args[1];

				content = grasp.replace(selectorType, selector, replacement, content);
			});

			done(null, content);
		} catch (e) {
			done(e);
		}

	}
);