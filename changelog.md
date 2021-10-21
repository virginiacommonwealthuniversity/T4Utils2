# Changelog
T4Utils 2 utilizes [GitHub's releases feature](https://github.com/blog/1547-release-your-software) for its changelogs, but this document serves as static duplicate of that content.

## [v2.0.0 - Build System & Usability Enhancements](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v2.0.0)

It's been a while since T4Utils 2 recieved any updates. With v2.0.0, the library has been rewritten from the ground up to support the following features:

1. The use of ES modules and Webpack for bundling
2. Better JSDoc integration for more thorough documentation
3. Removal of redundant, old, or hard-to-maintain code
4. Newly exposed and under-the-hood functions that power core features
5. Use outside content type or page layout contexts
6. Safer and more predictable behavior in edge-cases and debugging

And a whole lot more! This library is a drop-in replacement for the previous version.

## [v1.7.0_2017.06.01 - Ordinal Indicators Enhancement](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.7.0_2017.06.01)

This update enhances the structure, performance, and extensiveness of the `ordinalIndicators` module; Here's how:

* Both the `pageInfo` and `groupInfo` methods have been merged into one self-executing function: `info`
    * Now you can grab all page/group information via `ordinalIndicators.info`
* More information about groups is available
    * `ordinalIndicators.groupAmount` - The total amount of groups on the page
    * `ordinalIndicators.groupCount` - The total amount of content within the current group
    * `ordinalIndicators.groupID` - The ID of the current group (zero-based)
    * `ordinalIndicators.groupIndex` - The index of the current piece of content within the group (zero-based)

## [v1.6.1_2017.03.20 - publishCache Microsite Fix](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.6.1_2017.03.20)

This update fixes an issue with `publishCache.microsite`; This module variable is now working as intended. Here's some other updates:

* T4Utils2 is dropping support for v7.4
    * The v7.4 release of 1.6.0 has been pulled for API discrepancies and errors
    * Maintenance of one utility file with drastically different API calls is no longer feasible
* Build system files have been further simplified and upgraded to ES2015 (ES6)

## [v1.6.0_2017.02.24 - publishCache Module](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.6.0_2017.02.24)

This update brings a much needed `publishCache` module to T4Utils. Here's what you can do with it:

* `publishCache.channel` -   Returns a data object containing information about the current channel
* `publishCache.microsite` - Returns, if at all possible, a data object containing information about the current microsite

Check the source file to see the types of information you can pull from these objects!

## [v1.5.1_2016.12.19 - generateT4Tag() v7 Bug Fix](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.5.1_2016.12.19)

This is a v7 bug fix for `brokerUtils`'s module `generateT4Tag()`. Here's the scoop:

* T4 was processing the tag templates before being loaded into a content type or page layout.
    * No matter how this module was used, an empty string was always returned
* The first `<` of the tag template has been replaced with the unicode equivalent `\u003C`

## [v1.5.0_2016.12.09 - generateT4Tag()](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.5.0_2016.12.09)

The `brokerUtils` module has been extended to include `generateT4Tag()`!

* Create/process T4 tags by passing in a configuration object
    * *type* (content, media, navigation, title)
        * type - string
        * default - "content"
    * *name*
        * type - string
        * default - ""
    * *output*
        * type - string
        * default - "normal"
    * *modifiers*
        * type - array
        * default - []
    * *id*
        * type - number
        * default - 0
    * *formatter*
        * type - string
        * default - ""

## [v1.4.0_2016.10.31 - v7.4 Support](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.4.0_2016.10.31)

T4Utils2 now officially supports both TerminalFour v7.4 and v8.1. Here's what's changed:

* The Gulp build system now compiles 2 versions of the library (for TerminalFour v7.4 and v8.1)
    * The main `gulpfile.js` now uses a build module to simplify and bootstrap library compilation code
* The `ordinalIndicators` module now uses replaceable strings for any v7.1/v8.1 API discrepancies
    * These replaceable strings are changed to the correct API calls during the build process
* The `elementInfo` module has had undefined variable issues fixed
* The `media` module's `getImageVariantsIds` method is now wrapped in a `T4Utils.contextIsContent` conditional

## [v1.3.1_2016.10.13 - Global Context Variables](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.3.1_2016.10.13)

Issues related to the `var context = content || null;` problem within page-layouts have been solved. Here's how:

* In page-layouts, the original way of calculating context errors out. The following logic works and will be utilized: `var context = typeof content == 'undefined' ? null : content;`
* All new `context`, `contextIsPage` and `contextIsContent` member variables have been added to the base `T4Utils` object
    * This ensures that the context is defined globally at the start of the library
    * The modules `brokerUtils`, `elementInfo` and `ordinalIndicators` now utilize these member variables in their logic

## [v1.3.0_2016.10.12 - Ordinal Indicators Failsafe](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.3.0_2016.10.12)

A new failsafe has been added to `ordinalIndicators` to allow for the entire library to be used within page layouts. Here's what's changed:

* All code within pageInfo/groupInfo has been wrapped in a conditional checking to see if the global variable `content` is undefined
    * If `content` is defined, the self-executing functions will run as expected
    * If `content` is undefined, the self-executing functions will return objects with null key/value pairs

##[v1.2.1_2016.09.22 - Ordinal Indicators - pageCount](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.2.1_2016.09.22)

A new `pageCount` member variable has been added to `ordinalIndicators`.

* Returns the amount of content (of the kind in which the variable is called) on the page

## [v1.2.0_2016.09.16 - Ordinal Indicators Optimization](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.2.0_2016.09.16)

`ordinalIndicators` have been optimized in a few ways for speed and efficiency, and new features have been added. Here's what's changed:

* New functions `pageInfo` and `groupInfo` have been added
    * `pageFirst`, `pageIndex`, and `pageLast` are now aliases for key/value pairs `pageInfo` returns
    * `groupFirst` and `groupLast` are now aliases for key/value pairs `groupInfo` returns
* Comments are more contextual
* Syntax is simplified to utilize cleaner, more understandable code

## [v1.1.0_2016.09.15 - Ordinal Indicators Fix](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.1.0_2016.09.15)

`ordinalIndicators` are now properly working in TerminalFour Version 8.1! Here's what's changed:

* For the ordinalIndicators module `pageFirst`, `pageLast`, and `pageIndex`, the CSHelper API calls still refer to the ID of the content-type a piece of content utilizes as `content.getTemplateID();`. This is different from how to retrieve the content-type ID of the current content your in, which is `content.getContentTypeID()`

## [v1.0.0_2016.09.15 - Initial Release](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.0.0_2016.09.15)

A complete port of the original [T4Utils](https://github.com/FPBSchoolOfNursing/T4Utils), optimized for TerminalFour Version 8.1. Here's what's new:

* Cleaned up indentation, spacing, and Javascript formatting
* Cleaned up the commenting to render standardized, efficient JSDoc3 documentation
* Fixed 7.4 API calls in the `ordinalIndicators` module to work with 8.1
