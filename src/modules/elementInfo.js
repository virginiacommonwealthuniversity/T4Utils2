/**
 * elementInfo - The Element Info Module
 * @namespace elementInfo
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.1.0
 * @example
 * T4Utils.elementInfo
 */
T4Utils.elementInfo = T4Utils.elementInfo || {};

/**
 * Gets all elements within a piece of content
 * @function elementInfo.getElements
 * @returns {Array} an array containing the elements within the piece of content.
 * @example
 * T4Utils.elementInfo.getElements();
 */
T4Utils.elementInfo.getElements = function () {
    return T4Utils.contextIsContent ? content.getElements() : null ;
};

/**
 * Gets an element's publish value as a string
 * @function elementInfo.getElementValue
 * @param {string} element - The string value of the name of the element
 * @returns {string} the value of the element (can be null if the supplied value is already null)
 * @example
 * T4Utils.elementInfo.getElementValue(string);
 */
T4Utils.elementInfo.getElementValue = function (element) {
    if (T4Utils.contextIsContent) {
        var el = content.get(element);
        if (typeof el.publish === 'function') {
            return el.publish();
        }
    }
    return null;
};

/**
 * Gets the name of an element
 * @function elementInfo.getElementName
 * @param {string} element - The string value of the name of the element
 * @returns {string} the name of the element
 * @example
 * T4Utils.elementInfo.getElementName(string);
 */
T4Utils.elementInfo.getElementName = function (element) {
    if (T4Utils.contextIsContent) {
        var el = content.get(element);
        if (typeof el.getName === 'function') {
            return el.getName();
        }
    }
    return null;
};

/**
 * Gets the ID of an element
 * @function elementInfo.getElementID
 * @param {string} element - The string value of the name of the element
 * @returns {string} the ID of the element
 * @example
 * T4Utils.elementInfo.getElementID(string);
 */
T4Utils.elementInfo.getElementID = function (element) {
    if (T4Utils.contextIsContent) {
        var el = content.get(element);
        if (typeof el.getID === 'function') {
            return el.getID();
        }
    }
    return null;
};
