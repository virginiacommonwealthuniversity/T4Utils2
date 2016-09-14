/**
 * brokerUtils - The Broker Utilities Module
 * @namespace brokerUtils
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
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
    var context = content || null;
    return com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, context, language, isPreview, t4Tag);
};
