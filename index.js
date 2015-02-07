var transformTools = require('browserify-transform-tools');
var grasp = require('grasp');

var options = {
	jsFilesOnly: true
};


/**
 * String transform is called per-module.
 * In that, as many `require` calls you have, that many times it is called.
 * If you replace `require` call, transform for that module won’t be called.
 *
 * Besides, transform can be called globally as `browserify -g graspify`.
 * In that case transform is called for each nested module as well,
 * getting global config, defined in package.json.
 *
 * Also, config can be whether object or array.
 */
module.exports = transformTools.makeStringTransform("graspify", options,
	function (content, opts, done) {
		var replacements = opts.config.replace;
		var selectorType = opts.config.selector || 'equery';

		//prepare grasp options
		var replacement, selector;
		for (selector in replacements) {
			replacement = replacements[selector];
			if (Array.isArray(replacement)) {
				replacement = replacement[0];
				selectorType = replacement[1];
			}
		}

		//go by grasp requires, replace each one.
		content = grasp.replace(selectorType, selector, replacement, content);

		done(null, content);
	}
);