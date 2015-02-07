# graspify [![Build Status](https://travis-ci.org/dfcreative/graspify.svg?branch=master)](https://travis-ci.org/dfcreative/graspify) [![Code Climate](https://codeclimate.com/github/dfcreative/graspify/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/graspify)

Browserify transform to make modules transforms via [grasp](http://www.graspjs.com/). Basically, it allows to make almost any source code transforms.

[image]


## Installing

`$ npm install --save-dev graspify`


## Usage

Use graspify as a simple browserify transform, passing [grasp CLI arguments](http://www.graspjs.com/docs/options/) to it:

`$ browserify -t [ graspify '#myVariable' -R 'myVar' ] index.js`

Sometimes it is handy to perform global transform:

`$ browserify -g [ graspify '#myVariable' -R 'myVar' ] index.js`.


You can define multiple replacements in **package.json**:

```json
{
  "main": "./index.js",
  "graspify": {
    "replace": {
      "__ + __": "{{.l}} - {{.r}}",
      "#myVar": ["myVariable", "squery"]
    }
  },
  "browserify": {
    "transform": "graspify"
  }
  "dependencies": {
    "graspify": "^0.0.1"
  }
}
```


## Use cases

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



[![NPM](https://nodei.co/npm/graspify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/graspify/)