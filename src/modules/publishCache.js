/**
 * publishCache - The Publish Cache Module
 * @namespace publishCache
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.0.0
 * @example
 * T4Utils.publishCache
 */
T4Utils.publishCache = T4Utils.publishCache || {};

/**
 * Retrieve channel data
 * @function publishCache.channel
 * @returns {Object} and object containing channel information
 * @example
 * T4Utils.publishCache.channel;
 */
T4Utils.publishCache.channel = (function() {
    // Select the channel, whether it has microsites or not, and its root ID and section
    var channel =       publishCache.getChannel(),
        hasMicrosites = String(channel.hasMicrosites()) == 'true',
        rootID =        Number(channel.getRootSectionID()),
        rootSection =   TreeTraversalUtils.findSection(channel, section, rootID, language);
    // Microsite array
    function micrositeArray() {
        // Select the channel's microsite...
        var microsites = channel.getMicroSites(),
            // ... and define initial output/index variables
            output = [],
            i;
        // For each microsite...
        for (i = 0; i < microsites.size(); i++) {
            // ... push it to the output array
            output.push(microsites.get(i));
        }
        return output;
    }
    // Return an object that contains...
    return {
        baseHref:      String(channel.getBaseHref()),         // (String) Base HREF for the channel
        hasMicrosites: hasMicrosites,                         // (Boolean) Has any microsites?
        id:            Number(channel.getID()),               // (Integer) channel ID
        microsites:    hasMicrosites ? micrositeArray() : [], // (Array) An array of microsites
        object:        channel,                               // (Channel) The Java channel object
        rootSection: {                                        // (Object) rootSection
            id:        rootID,                                    // (Integer) ID of the root section
            isCurrent: Number(section.getID()) === rootID,        // (Boolean) Is the current section also the root section?
            object:    rootSection                                // (Section) The Java section object
        },
        siteRoot:      String(channel.getSiteRoot())          // (String) Site root for the channel
    };
})();

/**
 * Retrieve microsite data
 * @function publishCache.microsite
 * @returns {Object} and object containing microsite information
 * @example
 * T4Utils.publishCache.microsite;
 */
T4Utils.publishCache.microsite = (function() {
    // Select the microsite based on the current section and its root ID and section
    var channel =     publishCache.getChannel(),
        microsite =   publishCache.getMicroSiteFromChild(section),
        isMicrosite = Boolean(microsite);
    if (isMicrosite) {
        var rootID =      Number(microsite.getRootSectionID()),
            rootSection = TreeTraversalUtils.findSection(channel, section, rootID, language);
        // Return an object that contains...
        return {
            baseHref:      String(microsite.getBaseHref()),    // (String) Base HREF for the microsite
            id:            Number(microsite.getID()),          // (Integer) microsite ID
            isMicrosite:   isMicrosite,                        // (Boolean) Is this a microsite?
            object:        microsite,                          // (Channel) The Java channel object
            parentChannel: microsite.getParent(),              // (Channel) The Java channel object
            rootSection: {                                     // (Object) rootSection
                id:        rootID,                                 // (Integer) ID of the root section
                isCurrent: Number(section.getID()) === rootID,     // (Boolean) Is the current section also the root section?
                object:    rootSection                             // (Section) The Java section object
            },
            siteRoot:      String(microsite.getSiteRoot())     // (String) Site root for the microsite
        };
    } else {
        // Return an object that contains null key/value pairs
        return {
            baseHref:      null,
            id:            null,
            isMicrosite:   null,
            object:        null,
            parentChannel: null,
            rootSection: {
                id:        null,
                isCurrent: null,
                object:    null
            },
            siteRoot:      null
        };
    }
})();
