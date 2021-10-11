/**
 * The media library module
 * @namespace media
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
 * @example
 * T4Utils.media
 */

// Fetches a content element's ID
import { getElementID } from './elementInfo';

// Media package
importPackage(com.terminalfour.media);

// Media utilities package
importPackage(com.terminalfour.media.utils);

/**
 * Gets a media ID
 * @function media.getMediaID
 * @param {number|string|object} media The ID of the media, the name of the media element from the content type, or a media object
 * @returns {number} a media ID
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
 * @function media.getMediaObject
 * @param {number|string|object} media The ID of the media, the name of the media element from the content type, or a media object
 * @returns {object} a media object
 * @example
 * T4Utils.media.getMediaObject(12345); // Media ID
 * T4Utils.media.getMediaObject('Image'); // Media element
 * T4Utils.media.getMediaObject(mediaObject); // Media object (returns as-is)
 */
export function getMediaObject(media) {
    // If the provided media is already an object, return it as-is
    if (![ 'number', 'string' ].includes(typeof media)) return media;

    // Get the ID of the provided media...
    const id = getMediaID(media);
    // ... and return its corresponding media object
    return MediaManager
        .getManager()
        .get(
            dbStatement.getConnection(),
            id,
            language
        );
}

/**
 * Gets an array of image-variant ids
 * @function media.getImageVariantsIds
 * @param {number|string|object} media The ID of the media, the name of the media element from the content type, or a media object
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
    return MediaManager
        .getManager()
        .getMediaVariants(
            dbStatement.getConnection(),
            id,
            language
        );
}

/**
 * Gets the dimensions of a media object (picture)
 * @function media.getImageDimensions
 * @param {number|string|object} media The ID of the media, the name of the media element from the content type, or a media object
 * @returns {object} an object that has two properties; width and height
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
    const [
        width = 0,
        height = 0
    ] = Array.from(
        MediaUtils.getImageDimensions(media)
    );
    // ... and return them as an object
    return {
        width,
        height
    };
}
