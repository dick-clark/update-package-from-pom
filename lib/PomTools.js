/*globals process*/
var xml2js = require('xml2js');
var fs = require('fs');

/**
 * PomTools is a set of tools for use in the updatePomVersion command
 * line utility, it handles all the file reading / writing and manipulation.
 */
function PomTools() {
    'use strict';


    /**
     * Takes an xml string from the pomfile and extracts the project
     * version.
     * @param  {string} pomFile String representing the path to the pomfile
     * @return {string}         Version from pom.xml
     */
    this.getVersionFromPom = function getVersionFromPom(pomFile) {
        var version = null;
        var file = this.getStringContentsOfFile(pomFile);

        xml2js.parseString(file, function parseXmlStringCallback(err, result) {
            version = result.project.version[0];
        });
        this.log('Found pom version ' + version);
        return version;
    };


    /**
     * Takes a filename for a json file, opens it and writes the Version
     * to the parsed json object, and then writes the file.
     * @param  {string} file    Path to package.json
     * @param  {string} version Version number from pom.xml
     */
    this.writeVersionToPackageJson = function writeVersionToPackageJson(file, version) {
        this.log('Writing pomVersion ' + version + ' to ' + file);
        var pkg = JSON.parse(this.getStringContentsOfFile(file));
        pkg.pomVersion = version;
        fs.writeFile(file, JSON.stringify(pkg, null, 2));
    };


    /**
     * Opens up a file, if it exists, and returns it's contents as a string.
     * @param  {string} filename Path to the file.
     * @return {string}          Contents of the file
     */
    this.getStringContentsOfFile = function getStringContentsOfFile(filename) {
        if (!fs.statSync(filename)) {
            this.error(filename + ' does not exist');
        }
        return fs.readFileSync(filename).toString();
    };


    /**
     * Outputs a formatted log message with timestamp.
     * @param  {string} msg Log message to display
     */
    this.log = function log(msg) {
        console.log('[' + this.getTimestamp() + '] [LOG] ' + msg);
    };


    /**
     * Outputs a formatted error message to stdout and then exits the program.
     * @param  {string} msg The error message.
     */
    this.error = function error(msg) {
        console.error('[' + this.getTimestamp() + '] [ERROR] ' + msg);
        process.exit(1);
    };


    /**
     * Gets the current time as UTC string.
     * @return {string} Current time as UTC string.
     */
    this.getTimestamp = function getTimestamp() {
        return new Date().toUTCString();
    };
}

module.exports = new PomTools();
