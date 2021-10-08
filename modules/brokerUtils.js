/**
 * Broker utilities module
 * @module modules/brokerUtils
 * @namespace brokerUtils
 * @extends T4Utils
 * @contributors Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.0.0
 * @example
 * T4Utils.brokerUtils
 */

// Grab the context
import { context } from './base';

// Broker utilities package
importClass(com.terminalfour.publish.utils.BrokerUtils);

/**
 * Processes a T4 tag and returns its computed value
 * @function brokerUtils.processT4Tag
 * @param {string} tag - The tag you want to process
 * @returns {string} the string of the computed value
 * @example
 * T4Utils.brokerUtils.processT4tag(string);
 */
export function processT4Tag(tag) {
    return BrokerUtils.processT4Tags(
        dbStatement,
        publishCache,
        section,
        context,
        language,
        isPreview,
        tag.replace('<', '\u003C')
    );
}

/**
 * Creates and processes a T4 tag from a configuration object and returns its computed value
 * @function brokerUtils.generateT4Tag
 * @param {object} userConfig - The configuration object for creating the T4 tag
 * @returns {string} the string of the computed value
 * T4Utils.brokerUtils.generateT4Tag(object);
 */
export function generateT4Tag({
    type = 'content',
    name = '',
    id = 0,
    output = 'normal',
    modifiers = [],
    formatter = ''
} = {}) {
    // If type is "content" and there's no name, do nothing else
    if (type === 'content' && !name) return;

    // If the type is "media" and there's no formatter or ID, do nothing else
    if (type === 'media' && (!formatter || !id)) return;

    // If the type is "navigation" and there's no ID, do nothing else
    if (type === 'navigation' && !id) return;

    // Store the settings in an object...
    const settings = {
        type,
        name,
        id,
        output,
        modifiers,
        formatter
    };
    // ... and generate HTML attributes using them
    const attributes = Object
        .keys(settings)
        .map(key => {
            // Grab the key's corresponding value
            let value = settings[key];

            // If there is no value, return false
            if (!value) return false;
    
            // If the value is undefined/null, return false
            if (value == undefined) return false;

            // If the value is an empty array, return false
            if (Array.isArray(value) && !value.length) return false;

            // If the value is an array, join it together with commas
            if (Array.isArray(value)) value = value.join(',');

            // Return the key/value as an HTML attribute
            return `${key}="${value}"`;
        })
        .filter(Boolean)
        .join(' ');

    // Create the tag...
    const tag = `<t4 ${ attributes } />`;
    // ... and return it processed
    return processT4Tag(tag);
}
