/**
 * brokerUtils - The Broker Utilities Module
 * @namespace brokerUtils
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.1.0
 * @example
 * T4Utils.brokerUtils
 */
T4Utils.brokerUtils = T4Utils.brokerUtils || {};

/**
 * Processes a T4 tag and returns its computed value
 * @function brokerUtils.processT4Tag
 * @param {string} t4Tag - The tag you want to process
 * @returns {string} the string of the computed value
 * @example
 * T4Utils.brokerUtils.processT4tag(string);
 */
T4Utils.brokerUtils.processT4Tag = function (t4Tag) {
    return com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, T4Utils.context, language, isPreview, t4Tag);
};

/**
 * Creates and processes a T4 tag from a configuration object and returns its computed value
 * @function brokerUtils.generateT4Tag
 * @param {Object} userSettings - The configuration object for creating the T4 tag
 * @returns {string} the string of the computed value
 * T4Utils.brokerUtils.generateT4Tag(object);
 */
T4Utils.brokerUtils.generateT4Tag = function(userConfig) {
    var config = userConfig || {},
        settings = {
            type: config.type || 'content',    // Default: "content"
            name: config.name || '',           // Default: ""
            output: config.output || 'normal', // Default: "normal"
            modifiers: config.modifiers || [], // Default: []
            id: config.id || 0,                // Default: 0
            formatter: config.formatter || ''  // Default: ""
        },
        tag = '';
    // Type: Content; Required: Name
    if (settings.type == 'content' && settings.name) tag += '<t4 type="' + settings.type + '" name="' + settings.name + '" output="' + settings.output + '" modifiers="' + settings.modifiers.join(',') + '"' + settings.formatter ? ' formatter="' + settings.formatter + '"' : '' + ' />';
    // Type: Media; Required: Formatter, ID
    if (settings.type == 'media' && settings.formatter && settings.id) tag += '<t4 type="' + settings.type + '" id="' + settings.id + '" formatter="' + settings.formatter + '" />';
    // Type: Navigation; Required: ID
    if (settings.type == 'navigation' && settings.id) tag += '<t4 type="' + settings.type + '" id="' + settings.id + '" />';
    // Type: Title
    if (settings.type == 'title') tag += '<t4 type="' + settings.type + '" />';
    // If a tag was generated, return its computed value, otherwise, return an empty string
    return tag ? T4Utils.brokerUtils.processT4Tag(tag) : '';
};
