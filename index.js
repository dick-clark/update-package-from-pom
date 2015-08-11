var args = process.argv.splice(2);
var path = require('path');
var PomTools = require('./lib/PomTools.js');
var fs = require('fs');

/**
 * updatePomVersion
 *
 * Command line utility to look up maven project version number from
 * a specified path's pom.xml and dumps it into a top-level package.json
 * as a new property called pomVersion.
 *
 * Usage:
 * 		./bin/updatePomVersion /path/to/maven/root/
 *
 * Majority of the code you'll find in ./lib/PomTools.js
 */

if (args.length === 0) {
    PomTools.error('No path to the maven project root supplied as an argument.');
}

if (fs.statSync(args[0])) {

    var ver = PomTools.getVersionFromPom(
        path.join(args[0], '/pom.xml')
    );

    PomTools.writeVersionToPackageJson(
        path.join(args[0], '/package.json'),
        ver
    );

    PomTools.log('Done!');
} else {
    PomTools.error('Path supplied (' + args[0] + ') does not exist.');
}
