# Changelog
T4Utils 2 utilizes [GitHub's releases feature](https://github.com/blog/1547-release-your-software) for its changelogs, but this document serves as static duplicate of that content.

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
