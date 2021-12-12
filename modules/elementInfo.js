/**
 * Element info module
 * @module elementInfo
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @example
 * T4Utils.elementInfo;
 */

// Grab whether the context is the page or not
import { contextIsPage } from '../index.js';

/**
 * Gets all elements within a piece of content
 * @function getElements
 * @static
 * @returns {array} An array containing the elements within the piece of content
 * @example
 * T4Utils.elementInfo.getElements();
 */
export function getElements() {
    // Return null when within the context of a page
    if (contextIsPage) return null;

    // Otherwise, return the content's elements
    return content.getElements();
}

/**
 * Gets an element and returns its value
 * @function getElement
 * @static
 * @param {string} name The name of the element
 * @param {?string} method The method to run on the element
 * @returns {string|null} The value of the element (or null)
 * @example
 * T4Utils.elementInfo.getElement('name', 'publish');
 */
export function getElement(name, method) {
    // Return null when within the context of a page
    if (contextIsPage) return null;

    // Get the element of the given name
    const element = content.get(name);

    // If no method was provided, return the element as-is
    if (!method) return element;

    // If the method provided doesn't exist or isn't a function, return null
    if (!element[method] && typeof element[method] !== 'function') return null;

    // Finally, return the value's method output
    return element[method]();
}

/**
 * Gets an element's publish value as a string
 * @alias getElement.publish
 * @function getElementValue
 * @static
 * @param {string} name The name of the element
 * @returns {string|null} The value of the element
 * @see getElement
 * @example
 * T4Utils.elementInfo.getElementValue('name');
 */
getElement.publish = function(name) {
    return this(name, 'publish');
};

export function getElementValue(name) {
    return getElement.publish(name);
}

/**
 * Gets the name of an element
 * @alias getElement.getName
 * @function getElementName
 * @static
 * @param {string} name The name of the element
 * @returns {string|null} The name of the element
 * @see getElement
 * @example
 * T4Utils.elementInfo.getElementName('name');
 */
getElement.getName = function(name) {
    return this(name, 'getName');
};

export function getElementName(name) {
    return getElement.getName(name);
}

/**
 * Gets the ID of an element
 * @alias getElement.getID
 * @function getElementID
 * @static
 * @param {string} name The name of the element
 * @returns {string|null} The ID of the element
 * @see getElement
 * @example
 * T4Utils.elementInfo.getElementID('name');
 */
getElement.getID = function(name) {
    return this(name, 'getID');
};

export function getElementID(name) {
    return getElement.getID(name);
}
