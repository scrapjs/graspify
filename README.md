# graspify

Browserify transform to make any possible source code transformations via graspify. Can serve as a replacement for point transforms.

There is a huge amount of use-cases where grasp can be handy:

* Replacement for [aliasify](https://github.com/benbria/aliasify) as a global-transform, e. g. `require('module-a')` → `require('module-b')`
* Remove all [console.log](https://www.npmjs.com/package/deconsole)s.
* Remove [debug](https://www.npmjs.com/package/debug) module (which causes extra 4kb of gzipped code to bundle).
* Provide shims for any browser built-ins in node, like `document` → `require('dom-lite').document`.
* Create optimized jQuery builds of components utilizing jQuery functions instead of components, e. g. `var css = require('component-css')` → `var css = $.css`.
* Polyfill features: `WeakMap` → `WeakMap = require('weakmap-shim');`, though [requiring polyfills is not recommended](http://webreflection.blogspot.ru/2014/03/do-not-require-polyfills.html?spref=tw). It is better to use side polyfills for that, like [autopolyfiller](https://www.npmjs.com/package/autopolyfiller).
* Merge analogous modules, e. g. `Emitter = require('component-emitter')` → `Emitter = require('events').EventEmitter` (useful as a global transform). There’re lots of [package-analogs](https://github.com/dfcreative/package-analogs).
* Replace common code clones for better minimizing efficiency, e. g. `document.documentElement` × 12 → `var root = document.documentElement` + `doc`.
* Prepend/append additional code definitions, like jQuery-plugin definition: `$.fn.{{ name }} = function(){...}`
* Normalize common code constructions, e. g. `var Y.prototype = Object.create(X.prototype)` → `inherit(X, Y);` or `extend(a, b)` → `Object.assign(a, b)`.
* Exclude jQuery/vendor dependencies, e. g. `$.css()` → `var css = require('component-css');` + `css()`.
* Remove pointless constructions, like `try {$1} catch () {$2}` → `$1`. Solves in general tasks of [remove-catch-require](https://github.com/hughsk/remove-catch-require) and [remove-try-require](https://github.com/hughsk/remove-try-require).
* Remove code parts you don’t need anymore, like `module.exports.extraMethod` → ` `.
* Serve as a replacement for [replace-method](https://github.com/hughsk/replace-method).

## Installing

`$ npm install graspify`


## Use

Use graspify as a simple browserify transform, passing [grasp CLI arguments](http://www.graspjs.com/docs/options/) to it:

`$ browserify -t [ graspify '#myVariable' -R 'myVar' ] index.js`

You can also set up a **package.json**:

```json
{
  "main": "./js/entry.js",
  "browser": {
    "jquery": "./js/vendor/jquery.js"
  },
  "graspify": {
    "jquery": "$",
    "three": "global:THREE"
  },
  "browserify": {
    "transform": [ "graspify" ]
  },
  "dependencies": {
    "graspify": "^0.0.1"
  }
}
```