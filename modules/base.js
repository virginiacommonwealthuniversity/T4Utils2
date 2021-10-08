/**
 * Base module
 * @module modules/base
 * @contributors Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.0.0
 */

// Grab the package information
import pkg from '../package.json';

// Creates a toJavaString prototype on the global String object
String.prototype.toJavaString = function () {
    return new java.lang.String(this);
};

/**
 * The version of this library
 * @member version
 * @returns {string} the current version
 * @example
 * T4Utils.version;
 */
export const version = pkg.version;

/**
 * Writes the specified message type to the browser console
 * @member console
 * @param {String} method - You can specify which console method you want to use. 'log, warn, error' are valid
 * @param {String} message - The text you want to write to the screen.
 * @returns {null} document.write's a script tag with a console method
 * @example
 * T4Utils.console(string, string);
 */
export function console(method, message) {
    // If the type of message isn't a string, do nothing else
    if (typeof message !== 'string') return;

    // Otherwise, write a script tag with the console method
    return document.write(`<script t4utils>console.${ method }("${ message }");</script>`);
}

/**
 * Writes a message to the browser console
 * @function console.log
 * @param {String} message - The text you want to write to the screen.
 * @returns {null} document.write's a script tag with a console.log method
 * @example
 * T4Utils.console.log(string);
 */
console.log = function(message) {
    return this('log', message);
};

/**
 * Writes a warning to the browser console
 * @function console.warn
 * @param {String} message - The text you want to write to the screen.
 * @returns {null} document.write's a script tag with a console.warn method
 * @example
 * T4Utils.console.warn(string);
 */
console.warn = function(message) {
    return this('warn', message);
};

/**
 * Writes an error to the browser console
 * @function console.error
 * @param {String} message - The text you want to write to the screen.
 * @returns {null} document.write's a script tag with a console.error method
 * @example
 * T4Utils.console.error(string);
 */
console.error = function(message) {
    return this('error', message);
};

/**
 * Sets the context of where the library is being executed from (i.e. null if from within a page-layout, content if from within a content-type)
 * @member context
 * @return {?Object} context - Either null if the context is from within a page-layout, and the content variable if from withing a content-type
 * T4Utils.context
 */
export const context = content || null;

/**
 * Boolean of whether the context of where the library is being executed from is within a page-layout
 * @member contextIsPage
 * @return {boolean} context - True if the library is executed within a page-layout, false if not
 * @example
 * T4Utils.contextIsPage
 */
export const contextIsPage = !context;

/**
 * Boolean of whether the context of where the library is being executed from is within a content-type
 * @member contextIsContent
 * @return {boolean} context - True if the library is executed within a content-type, false if not
 * @example
 * T4Utils.contextIsContent
 */
export const contextIsContent = !!context;

/**
 * Writes a paragraph formatted HTML message to the browser
 * @member write
 * @param {string} text - The text you want to write to the screen
 * @returns {null} document.write's a paragraph tag
 * @example
 * T4Utils.write(string);
 */
export function write(text) {
    document.write(`<p t4utils>${ text }</p>`);
}

/**
 * Converts a javascript object to Java string
 * @member toString
 * @param {object} obj - The object you want to convert
 * @return {java.lang.String} the converted object
 * @example
 * T4Utils.toString(obj);
 */
export function toString(obj) {
    return new java.lang.String(obj);
}

/**
 * Returns safe versions of HTML unsafe strings
 * @member escapeHtml
 * @param {string} unsafe - The unsafe string
 * @return {string} an HTML safe string
 * @example
 * T4Utils.escapeHTML(string);
 */
export function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#039;');
}
