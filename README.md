# update-package-from-pom

## Description

This is a small command-line utility to grab the build version number from a maven `pom.xml` file and insert it into your `package.json` for easy use.

For the time being, both the `pom.xml` and `package.json` files must be in the same folder, as that's what the situation called for when writing this, also the property in your `package.json` is called `pomVersion`. Not exactly catchy, but hey, it's there.

## Installation

- Run `npm install -g update-package-from-pom`

## Usage

After installation it will be available as a command-line tool, simply run `update-pom-version {path}`.

It looks for both files in that path, more config will come soon, I swear upon the grave of my enemies I will do this.

## What it done look like

Given the following pom.xml:

``
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <version>2.5-SNAPSHOT</version>
</project>
``

After execution you should see something like this:

``
{
  "name": "mockPackage",
  "version": "1.0.0",
  "pomVersion": "2.5-SNAPSHOT"
}
```
