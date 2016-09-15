/**
 * T4Utils
 * @module
 * @author Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.0.0
 */
var T4Utils = (function (utils) {

    /**
     * The version of this library
     * @member version
     * @returns {string} the current version
     * @example
     * T4Utils.version;
     */
    utils.version = '{{version}}_{{datestamp}}';

    /**
     * The version of TerminalFour this library is intended for
     * @member t4
     * @returns {string} the version of TerminalFour this library is intened for
     * @example
     * T4Utils.t4;
     */
    utils.t4 = '8.1';

    /**
     * Writes the specified message type to the browser console
     * @member console
     * @param {string} consoleMethod - You can specify which console method you want to use. "log, warn, error" are valid
     * @param {String|Object} textOrObj - The text you want to write to the screen. With the console method you should be able to write objects as well, but it's not the case from inside the Util class
     * @example
     * T4Utils.console(string, string);
     */
    utils.console = function (consoleMethod, textOrObj) {
        if (typeof textOrObj === "string") {
            document.write("<script>console." + consoleMethod + "('" + textOrObj + "');</script>\n");
        }
    };

    /**
     * Writes a message to the browser console
     * @function console.log
     * @param {String|Object} textOrObj - The text you want to write to the screen. With the console method you should be able to write objects as well, but it's not the case from inside the Util class
     * @example
     * T4Utils.console.log(string);
     */
    utils.console.log = function (textOrObj) {
        if (typeof textOrObj === "string") {
            document.write("<script>console.log('" + textOrObj + "');</script>\n");
        }
    };

    /**
     * Writes a warning to the browser console
     * @function console.warn
     * @param {String|Object} textOrObj - The text you want to write to the screen. With the console method you should be able to write objects as well, but it's not the case from inside the Util class
     * @example
     * T4Utils.console.warn(string);
     */
    utils.console.warn = function (textOrObj) {
        if(typeof textOrObj === "string") {
            document.write("<script>console.warn('" + textOrObj + "');</script>\n");
        }
    };

    /**
     * Writes an error to the browser console
     * @function console.error
     * @param {String|Object} textOrObj - The text you want to write to the screen. With the console method you should be able to write objects as well, but it's not the case from inside the Util class
     * @example
     * T4Utils.console.error(string);
     */
    utils.console.error = function (textOrObj) {
        if(typeof textOrObj === "string") {
            document.write("<script>console.error('" + textOrObj + "');</script>\n");
        }
    };

    /**
     * Writes a paragraph formatted HTML message to the browser
     * @member write
     * @param {string} text - The text you want to write to the screen
     * @example
     * T4Utils.write(string);
     */
    utils.write = function (text) {
        document.write("<p>" + text + "</p>\n");
    };

    /**
     * Converts a javascript object to Java string
     * @member toString
     * @param {object} obj - The object you want to convert
     * @return {java.lang.String} the converted object
     * @example
     * T4Utils.toString(obj);
     */
    utils.toString = function (obj) {return new java.lang.String(obj);};

    /**
     * Returns safe versions of HTML unsafe strings
     * @member escapeHtml
     * @param {string} unsafe - The unsafe string
     * @return {string} an HTML safe string
     * @example
     * T4Utils.escapeHTML(string);
     */
    utils.escapeHtml = function (unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#039;");
    };

    /**
    * Creates a toJavaString prototype on the global String object
    */
    String.prototype.toJavaString = function () {return new java.lang.String(this);};

    // Return the utils
    return utils;

})(T4Utils || {});
