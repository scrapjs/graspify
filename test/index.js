var transformTools = require('browserify-transform-tools');
var graspify = require('..');
var test = require('tape');
var sink = require('sink-transform');
var path = require('path');
var fs = require('fs');

function fixtures() {
    return path.resolve
        .bind(path, __dirname, 'fixtures')
        .apply(null, arguments);
}

test('reading options', function(t){
    t.plan(1);

    var file = fixtures('bundle.js');

    var tr = graspify(file, {
        patterns: ["require('./2.js')", "require('./2-stub.js')"]
    })

    fs.createReadStream(file)
        .pipe(tr)
        .pipe(sink.str(function (body, done) {
            t.equal(body, 'var x = require(\'./2-stub.js\');');
            done();
        }));
});


test('aliasify', function(t){
    t.plan(1);
    var file = fixtures('aliasify.js');
    var content = fs.readFileSync(file).toString('utf8');

    graspify.setConfig({
        patterns: [
            ["require('./2')", "require('./3')"],
            ["require('./2.js')", "require('./3')"]
        ]
    });

    transformTools.runTransform(
        graspify,
        file,
        {content: content},
        function(err, transformed) {
            if (err) throw err;

            t.equal(transformed, "var x = require('./3');");
        }
    );
});

