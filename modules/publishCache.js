/**
 * The publish cache module
 * @module publishCache
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.0.0
 * @example
 * T4Utils.publishCache
 */

// Tree traversal utilities class
importClass(com.terminalfour.publish.utils.TreeTraversalUtils);

/**
 * The current section
 * @constant currentSection
 * @static
 * @type {Object}
 * @example
 * T4Utils.publishCache.currentSection;
 */
export const currentSection = section;

/**
 * Gets the channel
 * @function getChannel
 * @static
 * @returns {Object} The channel
 * @example
 * T4Utils.publishCache.getChannel();
 */
export function getChannel() {
    return publishCache.getChannel();
}

/**
 * Gets the microsite of a given section
 * @function getMicrosite
 * @static
 * @param {?Object} [section=currentSection] The section to retrieve the microsite from
 * @returns {Object|null} The microsite
 * T4Utils.publishCache.getMicrosite();
 */
export function getMicrosite(section = currentSection) {
    return publishCache.getMicroSiteFromChild(section);
}

/**
 * Gets the microsite or channel of a given section
 * @function getMicrositeOrChannel
 * @static
 * @param {?Object} [section=currentSection] The section to get data from
 * @returns {Object} The microsite or channel
 * @example
 * T4Utils.publishCache.getMicrositeOrChannel();
 */
export function getMicrositeOrChannel(section = currentSection) {
    // Grab the global channel...
    const channel = getChannel();
    // ... and the microsite
    const microsite = getMicrosite(section);

    // Return the microsite or the channel
    return microsite || channel;
}

/**
 * Returns an array of channel microsites
 * @function getMicrosites
 * @static
 * @param {?Object} [channel=getChannel()] The global channel object
 * @returns {Array} An array of microsites
 * @example
 * T4Utils.publishCache.getMicrosites(channel);
 */
export function getMicrosites(channel = getChannel()) {
    // Get the channels' microsites...
    const microsites = channel.getMicroSites();
    // ... and setup an output array
    let output = [];

    // If there are no microsites, return the output as is
    if (!microsites.size()) return output;

    // Otherwise, push each microsite to the output...
    for (let microsite = 0; microsite < microsites.size(); microsite++) {
        output.push(microsites.get(microsite));
    }
    // ... and return it
    return output;
}

/**
 * Returns an object of root section data of a microsite or channel
 * @function getRootSectionData
 * @static
 * @param {?Object} instructions The instructions for retrieving the root section data
 * @param {?Object} instructions.microsite The microsite
 * @param {?Object} [instructions.channel=getChannel()] The global channel object
 * @param {?Object} [instructions.section=currentSection] The section to check against
 * @returns {Object} The root section data
 * @example
 * T4Utils.publishCache.getRootSectionData(microsite, channel);
 */
export function getRootSectionData({
    microsite,
    channel = getChannel(),
    section = currentSection
} = {}) {
    // Gefine the reference,...
    const reference = microsite || channel;
    // ... get its root section ID,...
    const id = Number(reference.getRootSectionID());
    // ... and whether the root is the provided section
    const isCurrent = Number(section.getID()) === id;

    // Grab an object of the channel/microsite...
    const object = TreeTraversalUtils.findSection(
        channel,
        section,
        id,
        language
    );
    // ... and return everything as an object
    return {
        id,
        isCurrent,
        object
    };
}

/**
 * Returns an object of microsite or channel data
 * @function getChannelData
 * @static
 * @param {?Obect} instructions The instructions for retrieving the root section data
 * @param {?Object} instructions.microsite The microsite
 * @param {?Object} [instructions.channel=getChannel()] The global channel object
 * @param {?Object} [instructions.section=currentSection] The section to check against
 * @returns {Object} The microsite or channel data
 * @example
 * T4Utils.publishCache.getChannelData();
 */
export function getMicrositeOrChannelData({
    microsite,
    channel = getChannel(),
    section = currentSection
} = {}) {
    // Store an object to the microsite, if provided, or the channel
    const reference = microsite || channel;

    // Get the object's base href,...
    const baseHref = String(reference.getBaseHref());
    // ... id,...
    const id = Number(reference.getID());
    // ... root section information,...
    const rootSection = getRootSectionData({ microsite, channel, section });
    // ... and site root
    const siteRoot = String(reference.getSiteRoot());

    // Create an object with the basic data
    let data = {
        baseHref,
        id,
        object: reference,
        rootSection,
        siteRoot
    };

    // If this channel is a microsite,...
    if (microsite) {
        // ... include microsite/parent data...
        data.isMicrosite = Boolean(microsite);
        data.parentChannel = microsite.getParent();
    } else {
        // ... otherwise, include data regarding its microsites
        data.hasMicrosites = channel.hasMicrosites();
        data.microsites = getMicrosites(channel);
    }

    // Finally, return the data
    return data;
}

/**
 * Retrieve microsite data
 * @constant microsite
 * @static
 * @type {Object}
 * @see getMicrositeOrChannelData
 * @example
 * T4Utils.publishCache.microsite;
 */
export const microsite = getMicrositeOrChannelData({
    microsite: getMicrosite()
});

/**
 * Retrieve channel data
 * @constant channel
 * @static
 * @type {Object}
 * @see getMicrositeOrChannelData
 * @example
 * T4Utils.publishCache.channel;
 */
export const channel = getMicrositeOrChannelData();
