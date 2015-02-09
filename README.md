# graspify [![Build Status](https://travis-ci.org/dfcreative/graspify.svg?branch=master)](https://travis-ci.org/dfcreative/graspify) [![Code Climate](https://codeclimate.com/github/dfcreative/graspify/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/graspify)

Browserify transform making source code replacements using [grasp.replace](http://www.graspjs.com/).



## Installing

`$ npm install --save-dev graspify`


## Usage

Define replacements in **package.json**:

```json
{
  "main": "./index.js",
  "graspify": [
    ["equery", "__ + __", "{{.l}} - {{.r}}"],
    ["squery", "#myVar", "myVariable"],
    ["file", "./selector.js", "x"]
  ],
  "dependencies": {
    "graspify": "^0.0.1"
  }
}
```

Run graspify transform:

`$ browserify -t graspify index.js`

Sometimes it is handy to perform global transform, to affect nested modules:

`$ browserify -g graspify index.js`.



## API

Graspify can be used programmatically. It takes the same arguments as [`grasp.replace`](http://www.graspjs.com/docs/lib#replace):

```js
var browserify = require('browserify');
var b = browserify('./entry.js');
var graspify = require('graspify');

b.transform(graspify, [
  ["squery", "#myVar", "myVariable"],
  ["equery", "__ + __", "{{.r}} + {{.l}}"],

  //you can also pass a replacement funtion
  ["equery", "require($module)", function(){
    return "require('stub')"
  }]
])
```



## Use-cases

There is a huge amount of use cases where grasp can be useful.

### Replace require callse, like [aliasify](https://github.com/benbria/aliasify)

Equery:

```js
```

Squery:

```js
["squery", "#require[callee=./2]", ""],
["squery", "#require[callee=./2.js]", ""]
```


###  Remove `console.log`s, like [deconsole](https://www.npmjs.com/package/deconsole)

Equery:

```js
[]
```

Squery:

```js
["equery", "console.log", ""]
```


### Remove [debug](https://www.npmjs.com/package/debug) package (which causes extra 4kb of gzipped code).

TODO: debug might be assigned to other variable (not debug), consider more complicated selector.

Equery:

```js
["equery", "debug(_$)", ""],
["equery", "require[callee~=/debug[\'\"]$/]", "''"]
```

Squery:

```js
[]
```


### Provide shims for browser built-in in node, like `document` → `require('dom-lite').document`.

```js
{
  "before": "var document = require('dom-lite').document;\n"
}
```


### Create optimized jQuery builds of components utilizing jQuery functions instead of components, e. g. `var css = require('component-css')` → `var css = $.css`.

Equery:

```js
[]
```

Squery:

```js
```


### Polyfill features: `WeakMap` → `WeakMap = require('weakmap-shim');`, though [requiring polyfills is not recommended](http://webreflection.blogspot.ru/2014/03/do-not-require-polyfills.html?spref=tw). It is better to use side polyfills for that, like [autopolyfiller](https://www.npmjs.com/package/autopolyfiller).

Equery:

```js
```

Squery:

```js
```


### Merge analogous modules, e. g. `Emitter = require('component-emitter')` → `Emitter = require('events').EventEmitter` (useful as a global transform). There’re lots of [package-analogs](https://github.com/dfcreative/package-analogs).

Equery:

```js
```

Squery:

```js
```


### Replace common code clones for better minimizing efficiency, e. g. `document.documentElement` × 12 → `var root = document.documentElement` + `doc`.

Equery:

```js
```

Squery:

```js
```


### Prepend/append additional code definitions, like jQuery-plugin definition: `$.fn.{{ name }} = function(){...}`.

Equery:

```js
```

Squery:

```js
```


### Normalize common code constructions, e. g. `var Y.prototype = Object.create(X.prototype)` → `inherit(X, Y);` or `extend(a, b)` → `Object.assign(a, b)`.

Equery:

```js
```

Squery:

```js
```


### Exclude jQuery/vendor dependencies, e. g. `$.css()` → `var css = require('component-css');` + `css()`.

Equery:

```js
```

Squery:

```js
```


### Remove pointless constructions, like `try {$1} catch () {$2}` → `$1`. Solves in general tasks of [remove-catch-require](https://github.com/hughsk/remove-catch-require) and [remove-try-require](https://github.com/hughsk/remove-try-require).

Equery:

```js
```

Squery:

```js
```


### Remove code parts you don’t need anymore, like `module.exports.extraMethod` → ` `.

Equery:

```js
```

Squery:

```js
```


### Replace all method calls, as [replace-method](https://github.com/hughsk/replace-method).

Equery:

```js
```

Squery:

```js
```



[![NPM](https://nodei.co/npm/graspify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/graspify/)