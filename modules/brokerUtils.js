/**
 * Broker utilities module
 * @module brokerUtils
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @example
 * T4Utils.brokerUtils;
 */

// Grab the context
import { context } from '..';

// Broker utilities package
importClass(com.terminalfour.publish.utils.BrokerUtils);

/**
 * Processes a T4 tag and returns its computed value
 * @function processT4Tag
 * @static
 * @param {string} tag The T4 tag to process
 * @returns {string} The computed value of the T4 tag
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
 * An array of T4 tag modifiers
 * @typedef {string[]} T4TagModifiers
 */

/**
 * Creates and processes a T4 tag from a configuration object and returns its computed value
 * @function generateT4Tag
 * @static
 * @param {?object} config The T4 tag configuration object
 * @param {?string} [config.type='content'] The T4 tag type
 * @param {?string} [config.name=''] The T4 tag name
 * @param {?number} [config.id=0] The T4 tag ID
 * @param {?T4TagModifiers} [config.modifiers=[]] The T4 tag modifiers
 * @param {?string} [config.formatter=''] The T4 tag formatter
 * @see processT4Tag
 * @returns {string} The computed value of the generated T4 tag
 * @example
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
