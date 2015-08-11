var fs = require('fs');
var PomTools = require('../../lib/PomTools.js');
var path = require('path');

var appPath = path.join(__dirname, '../../');
var VERSION = '2.5-SNAPSHOT';

describe('getVersionFromPom', function () {
    'use strict';

    it('Should retrieve the correct version from the parent pom file.', function () {
        var data = PomTools.getVersionFromPom(appPath + 'test/mocks/mockpom.xml');

        expect(data).toBeDefined();
        expect(data).toBe(VERSION);
    });

});

describe('writeVersionToPackageJson', function () {
    'use strict';

    it('Should write the specified pom to the targetted package.json', function () {
        PomTools.writeVersionToPackageJson(appPath + 'test/mocks/mockpackage.json', VERSION);

        setTimeout(function () {
            var mockjson = JSON.parse(fs.readFileSync(appPath + 'test/mocks/mockpackage.json').toString());

            expect(mockjson.pomVersion).toBeDefined();
            expect(mockjson.pomVersion).toBe(VERSION);
        }, 100);
    });

});

describe('getStringContentsOfFile', function () {
    'use strict';

    it('Should return the contents of the specified file as a string', function () {
        var filename = appPath + 'test/mocks/mockpackage.json';

        var mockpom = fs.readFileSync(appPath + 'test/mocks/mockpom.xml').toString();
        var fileContents = PomTools.getStringContentsOfFile(appPath + 'test/mocks/mockpom.xml');

        expect(fileContents).toBeDefined();
        expect(fileContents).toEqual(mockpom);
    });
});
