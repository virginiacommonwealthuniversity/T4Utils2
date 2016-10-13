[![Powered by Virginia Commonwealth University](https://t4tools.vcu.edu/github/images/powered-by.svg)](http://www.vcu.edu/)

# T4Utils 2
A Javascript library of utility classes and extensions for TerminalFour Programmable Layouts. This repo is a port/continuation of [Ben Margevicius'](https://github.com/bdm4) unmaintained [T4Utils](https://github.com/FPBSchoolOfNursing/T4Utils) library.

## Latest Version

## [v1.3.1_2016.10.13 - Global Context Variables](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.3.1_2016.10.13)
Issues related to the `var context = content || null;` problem within page-layouts have been solved. Here's how:
* In page-layouts, the original way of calculating context errors out. The following logic works and will be utilized: `var context = typeof content == 'undefined' ? null : content;`
* All new `context`, `contextIsPage` and `contextIsContent` member variables have been added to the base `T4Utils` object
    * This ensures that the context is defined globally at the start of the library
    * The modules `brokerUtils`, `elementInfo` and `ordinalIndicators` now utilize these member variables in their logic

Check out the [changelog](changelog.md) for previous release information.

## Table of contents
* [Quick start](#quick-start)
* [Documentation](#documentation)
* [Contributing](#contributing)
* [Maintainers](#maintainers)

## Quick start
There's a couple different ways you can get your hands on the T4Utils 2 library:

1. [Download one of the latest releases](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases)
2. Clone the repo, `npm install`, and `gulp` (Requires [Node](https://nodejs.org/))

## Documentation
The T4Utils 2 build environment comes with a JSDoc3 Gulp task. To build out the HTML documentation, run `$ gulp docs` and look in the `docs` directory within the project. This documentation can then be previewed within a web browser or uploaded to server.

## Contributing
Please read through the [contribution guidelines](contribute.md) before opening issues or contributing code.

## Maintainers
**Joel Eisner**
* [Twitter (@joeleisner)](https://twitter.com/joeleisner)
* [GitHub (@joeleisner)](https://github.com/joeleisner)
