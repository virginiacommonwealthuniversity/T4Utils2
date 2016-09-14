/**
 * siteManager - The Site Manage Module
 * @namespace siteManager
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
 * @example
 * T4Utils.siteManager
 */
T4Utils.siteManager = T4Utils.siteManager || {};

/**
 * Returns the version of the site manager
 * @constant siteManager.version
 * @returns {string} the site manager version
 * @example
 * T4Utils.siteManager.version;
 */
T4Utils.siteManager.version = com.terminalfour.sitemanager.SiteManagerVersion.version;

/**
 * Returns the build details of the site manager
 * @constant siteManager.buildDetails
 * @returns {string} the site manager built details
 * @example
 * T4Utils.siteManager.buildDetails;
 */
T4Utils.siteManager.buildDetails = com.terminalfour.sitemanager.SiteManagerVersion.buildDetails;

/**
 * Returns the java version of the site manager
 * @constant siteManager.javaVersion
 * @returns {string} the site manager java version
 * @example
 * T4Utils.siteManager.javaVersion;
 */
T4Utils.siteManager.javaVersion = java.lang.System.getProperty('java.version');
