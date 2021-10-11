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
 * Gets a media object by id
 * @function media.getMediaObject
 * @param {int} id The id of the media object desired
 * @returns {object} a media object
 * @example
 * T4Utils.media.getMediaObject(int);
 */
export function getMediaObject(id) {
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
 * @returns {Array} An array of media ids
 * @example
 * T4Utils.media.getImageVariantsIds(media);
 */
export function getImageVariantsIds(media) {
    // If the provided media is an element name, convert it to an ID
    if (typeof media === 'string') media = getElementID(media);

    // If the provided media is an object, convert it to an ID
    if (typeof media !== 'number') media = media.getID();

    // Return the variant IDs
    return MediaManager
        .getManager()
        .getMediaVariants(
            dbStatement.getConnection(),
            media,
            language
        );
}

/**
 * Gets the dimensions of a media object (picture)
 * @function media.getImageDimensions
 * @param {number|object} media The ID of the media or a media object
 * @returns {object} an object that has two properties; width and height
 * @example
 * T4Utils.media.getImageDimensions(object);
 */
export function getImageDimensions(media) {
    // If the provided media is an element name, convert it to an ID
    if (typeof media === 'string') media = getElementID(media);

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
