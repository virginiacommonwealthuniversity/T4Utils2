/**
 * The media library module
 * @module media
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @requires module:elementInfo
 * @example
 * T4Utils.media
 */

// Fetches a content element's ID
import { getElementID } from './elementInfo.js';

// Media package
importPackage(com.terminalfour.media);

// Media utilities package
importPackage(com.terminalfour.media.utils);

/**
 * The ID of the media, the name of the media element from the content type, or a media object
 * @typedef {(number|string|object)} MediaReference
 */

/**
 * Gets a media ID
 * @function getMediaID
 * @static
 * @param {MediaReference} media The media reference
 * @returns {number} The media's ID
 * @example
 * T4Utils.media.getMediaID(12345); // Media ID (returns as-is)
 * T4Utils.media.getMediaID('Image'); // Media element
 * T4Utils.media.getMediaID(mediaObject); // Media object
 */
export function getMediaID(media) {
    // If the provided media is a number, return it as is
    if (typeof media === 'number') return media;

    // If the provided media is an element name, convert it to an ID
    if (typeof media === 'string') return getElementID(media);

    // If the provided media is an object, convert it to an ID
    return media.getID();
}

/**
 * Gets a media object by id
 * @function getMediaObject
 * @static
 * @param {MediaReference} media The media reference
 * @returns {object} The media object
 * @example
 * T4Utils.media.getMediaObject(12345); // Media ID
 * T4Utils.media.getMediaObject('Image'); // Media element
 * T4Utils.media.getMediaObject(mediaObject); // Media object (returns as-is)
 */
export function getMediaObject(media) {
    // If the provided media is already an object, return it as-is
    if (!['number', 'string'].includes(typeof media)) return media;

    // Get the ID of the provided media...
    const id = getMediaID(media);
    // ... and return its corresponding media object
    return MediaManager.getManager().get(
        dbStatement.getConnection(),
        id,
        language
    );
}

/**
 * Gets an array of image variant IDs
 * @function getImageVariantsIds
 * @static
 * @param {MediaReference} media The media reference
 * @see getMediaID
 * @returns {Array} An array of image variant ids
 * @example
 * T4Utils.media.getImageVariantsIds(12345); // Media ID
 * T4Utils.media.getImageVariantsIds('Image'); // Media element
 * T4Utils.media.getImageVariantsIds(mediaObject); // Media object
 */
export function getImageVariantsIds(media) {
    // Get the ID of the provided media...
    const id = getMediaID(media);
    // ... and return its corresponding media variant IDs
    return MediaManager.getManager().getMediaVariants(
        dbStatement.getConnection(),
        id,
        language
    );
}

/**
 * Width and height dimensions
 * @typedef {Object} Dimensions
 * @property {number} width
 * @property {number} height
 */

/**
 * Gets the dimensions of a media object (picture)
 * @function getImageDimensions
 * @static
 * @param {MediaReference} media The media reference
 * @see getMediaID
 * @see getMediaObject
 * @returns {Dimensions} An dimensions object
 * @example
 * T4Utils.media.getImageDimensions(12345); // Media ID
 * T4Utils.media.getImageDimensions('Image'); // Media element
 * T4Utils.media.getImageDimensions(mediaObject); // Media object
 */
export function getImageDimensions(media) {
    // If the provided media is an element name, convert it to an ID
    if (typeof media === 'string') media = getMediaID(media);

    // If a media ID was provided, convert it to a media object
    if (typeof media === 'number') media = getMediaObject(media);

    // Grab the width and height of the media object's image dimensions...
    const [width = 0, height = 0] = Array.from(
        MediaUtils.getImageDimensions(media)
    );
    // ... and return them as an object
    return {
        width,
        height
    };
}
