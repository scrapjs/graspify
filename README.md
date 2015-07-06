# graspify2

Browserify transform to make source code replacements using [grasp](http://www.graspjs.com/).

This is a clone from [graspify@2.0.3](https://www.npmjs.com/package/graspify), which was broken.


## Installing

`$ npm install --save-dev graspify2`


## Usage

*NOT* support defining replacements in **package.json**

## API

Graspify can be used programmatically:

```js
var browserify = require('browserify');
var b = browserify('./entry.js');
var graspify = require('graspify2');

b.transform(graspify, {
    patterns: [
      ["squery", "#myVar", "myVariable"],
      ["equery", "__ + __", "{{.r}} + {{.l}}"],

      ["equery", "require($module)", function(){
        return "require('stub')"
      }]
    ]
})
```
