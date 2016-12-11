[![Powered by Virginia Commonwealth University](https://t4tools.vcu.edu/github/images/powered-by.svg)](http://www.vcu.edu/)

# T4Utils 2
A Javascript library of utility classes and extensions for TerminalFour Programmable Layouts. This repo is a port/continuation of [Ben Margevicius'](https://github.com/bdm4) unmaintained [T4Utils](https://github.com/FPBSchoolOfNursing/T4Utils) library.

## Latest Version

### [v1.5.0_2016.12.09 - generateT4Tag()](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.5.0_2016.12.09)
The `brokerUtils` module has been extended to include `generateT4Tag()`!
* Create/process T4 tags by passing in a configuration object
* Defaults are established to simplify configuration object creation
    * type      - "content"
    * name      - ""
    * output    - "normal"
    * modifiers - []
    * id        - 0
    * formatter - ""

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

**Sam Yerkes**
* [Twitter (@samyerkes)](https://twitter.com/samyerkes)
* [GitHub (@samyerkes)](https://github.com/samyerkes)
