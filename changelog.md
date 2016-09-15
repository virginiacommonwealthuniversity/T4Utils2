# Changelog
T4Utils 2 utilizes [GitHub's releases feature](https://github.com/blog/1547-release-your-software) for its changelogs, but this document serves as static duplicate of that content.

## [v1.1.0_2016.09.15 - Ordinal Indicators Fix](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.1.0_2016.09.15)
`ordinalIndicators` are now properly working in TerminalFour Version 8.1! Here's what's changed:
* For the ordinalIndicators module `pageFirst`, `pageLast`, and `pageIndex`, the CSHelper API calls still refer to the ID of the content-type a piece of content utilizes as `content.getTemplateID();`. This is different from how to retrieve the content-type ID of the current content your in, which is `content.getContentTypeID()`

## [v1.0.0_2016.09.15 - Initial Release](https://github.com/virginiacommonwealthuniversity/T4Utils2/releases/tag/v1.0.0_2016.09.15)
A complete port of the original [T4Utils](https://github.com/FPBSchoolOfNursing/T4Utils), optimized for TerminalFour Version 8.1. Here's what's new:
* Cleaned up indentation, spacing, and Javascript formatting
* Cleaned up the commenting to render standardized, efficient JSDoc3 documentation
* Fixed 7.4 API calls in the `ordinalIndicators` module to work with 8.1
