/**
 * A Javascript library of utility classes and extensions for TerminalFour programmable layouts
 * @namespace T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 */

// Grab the package information
import pkg from './package.json';

// Java language package
importPackage(java.lang);

// Creates a toJavaString prototype on the global String object
String.prototype.toJavaString = function () {
    return new java.lang.String(this);
};

/**
 * The version of this library
 * @const version
 * @static
 * @type {string}
 * @example
 * T4Utils.version;
 */
export const version = pkg.version;

/**
 * Writes a message to the browser console in preview mode
 * @function console
 * @static
 * @param {string} method The console method. 'log, warn, error' are valid
 * @param {string} message The message to write
 * @returns {null} Writes a script tag with a console method to the document
 * @example
 * T4Utils.console('log', 'message');
 */
export function console(method, message) {
    // If the method doesn't exist or isn't a string, do nothing else
    if (!method || typeof method !== 'string') return;

    // If the message doesn't exist or isn't a string, do nothing else
    if (!message || typeof message !== 'string') return;

    // Otherwise, write a script tag with the console method if in preview mode
    if (isPreview) return document.write(`<script t4utils>console.${ method }("${ message }");</script>`);
}

/**
 * Writes a log message to the browser console in preview mode
 * @alias console.log
 * @static
 * @param {string} message The message
 * @returns {null} Writes a script tag with a console.log method to the document
 * @see console
 * @example
 * T4Utils.console.log('log message');
 */
console.log = function(message) {
    return this('log', message);
};

/**
 * Writes a warning message to the browser console in preview mode
 * @function console.warn
 * @static
 * @param {string} message The message
 * @returns {null} Writes a script tag with a console.warn method to the document
 * @see console
 * @example
 * T4Utils.console.warn('warning message');
 */
console.warn = function(message) {
    return this('warn', message);
};

/**
 * Writes an error message to the browser console in preview mode
 * @function console.error
 * @static
 * @param {string} message The message
 * @returns {null} Writes a script tag with a console.error method to the document
 * @see console
 * @example
 * T4Utils.console.error('error message');
 */
console.error = function(message) {
    return this('error', message);
};

/**
 * The context of where the library is being executed from (`null` if from within a page layout, `content` if from within a content type)
 * @const context
 * @static
 * @type {object|null}
 * @example
 * T4Utils.context
 */
export const context = content || null;

/**
 * If the context of where the library is being executed from is within a page-layout
 * @const contextIsPage
 * @static
 * @type {boolean}
 * @see context
 * @example
 * T4Utils.contextIsPage
 */
export const contextIsPage = !context;

/**
 * If the context of where the library is being executed from is within a content-type
 * @const contextIsContent
 * @static
 * @type {boolean}
 * @see context
 * @example
 * T4Utils.contextIsContent
 */
export const contextIsContent = !!context;

/**
 * Writes a paragraph formatted HTML message to the document in preview mode
 * @function write
 * @static
 * @param {string} text The text
 * @returns {null} Writes a paragraph tag with the given text to the document
 * @example
 * T4Utils.write('paragraph text');
 */
export function write(text) {
    if (isPreview) return document.write(`<p t4utils>${ text }</p>`);
}

/**
 * Converts a javascript object to Java string
 * @function toString
 * @static
 * @param {object} obj The object to convert
 * @return {java.lang.String} The object as a Java string
 * @example
 * T4Utils.toString({});
 */
export function toString(obj) {
    return new java.lang.String(obj);
}

/**
 * Returns an HTML safe string
 * @function escapeHtml
 * @static
 * @param {string} html The HTML unsafe string
 * @return {string} An HTML safe string
 * @example
 * T4Utils.escapeHTML('<p>Unsafe HTML</p>');
 */
export function escapeHtml(html) {
    return html.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;');
}

export * as brokerUtils from './modules/brokerUtils';
export * as elementInfo from './modules/elementInfo';
export * as getSectionInfo from './modules/getSectionInfo';
export * as media from './modules/media';
export * as ordinalIndicators from './modules/ordinalIndicators';
export * as publishCache from './modules/publishCache';
export * as security from './modules/security';
export * as siteManager from './modules/siteManager';
