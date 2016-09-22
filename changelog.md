# Changelog
T4Utils 2 utilizes [GitHub's releases feature](https://github.com/blog/1547-release-your-software) for its changelogs, but this document serves as static duplicate of that content.

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
