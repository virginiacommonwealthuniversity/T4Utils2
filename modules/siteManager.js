/**
 * The site manager module
 * @module siteManager
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @example
 * T4Utils.siteManager
 */

// TerminalFour version class
importClass(com.terminalfour.TerminalFourVersion);

// Java language package
importPackage(java.lang);

/**
 * The build date of the site manager
 * @constant buildDate
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.buildDate;
 */
export const buildDate = TerminalFourVersion.getBuildDate();

/**
 * The build number of the site manager
 * @constant buildNumber
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.buildNumber;
 */
export const buildNumber = TerminalFourVersion.getCIBuildNumber();

/**
 * The formatted build date of the site manager
 * @constant formattedBuildDate
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.formattedBuildDate;
 */
export const formattedBuildDate = TerminalFourVersion.getFormattedBuildDate();

/**
 * The full version info of the site manager
 * @constant fullVersionInfo
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.fullVersionInfo;
 */
export const fullVersionInfo = TerminalFourVersion.getFullVersionInformation();

/**
 * The build details of the site manager (alias of fullVersionInfo)
 * @constant buildDetails
 * @static
 * @type {string}
 * @see fullVersionInfo
 * @example
 * T4Utils.siteManager.buildDetails;
 */
export const buildDetails = fullVersionInfo;

/**
 * The name of the site manager
 * @constant name
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.name;
 */
export const name = TerminalFourVersion.getName();

/**
 * The version of the site manager
 * @constant version
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.version;
 */
export const version = TerminalFourVersion.getVersion();

/**
 * The Java version of the site manager
 * @constant javaVersion
 * @static
 * @type {string}
 * @example
 * T4Utils.siteManager.javaVersion;
 */
export const javaVersion = System.getProperty('java.version');
