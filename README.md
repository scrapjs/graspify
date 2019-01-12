# graspify2

Browserify transform to make source code replacements using [grasp](http://www.graspjs.com/).

This is a clone from [graspify@2.0.3](https://www.npmjs.com/package/graspify), which was broken.


## Installing

`$ npm install --save-dev graspify2`

## package.json

Replace `DEBUG` with `false`

```json
{
  "browserify": {
    "transform":[
      ["graspify2", { "patterns": ["squery", "#DEBUG", "false"] }]
    ]
  }
}
```

## API

Also can be used programmatically:

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

### options

#### patterns

Type: `Array`

Each replacing rule is denoted by a triplet.
If more than one rules specified, `.patterns` should be something like the example in `API`.
