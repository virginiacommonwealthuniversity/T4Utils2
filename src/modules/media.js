/**
 * media - The Media Library Module
 * @namespace media
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
 * @example
 * T4Utils.media
 */
T4Utils.media = T4Utils.media || {};

/**
 * Gets an array of image-variant ids
 * @function media.getImageVariantsIds
 * @param {media} mediaElement - Media element from the site manager
 * @returns {Array} an array of media ids
 * @example
 * T4Utils.media.getImageVariantsIds(media);
 */
T4Utils.media.getImageVariantsIds = function (mediaElement) {
    var imageID = content.get(mediaElement).getID(),
        variantIds = MediaManager.getManager().getMediaVariants(dbStatement.getConnection(), imageID, language);
    return variantIds;
};

/**
 * Gets the dimensions of a media object (picture)
 * @function media.getImageDimensions
 * @param {object} mediaObj - this.getMediaObect
 * @returns {object} an object that has two properties; width and height
 * @example
 * T4Utils.media.getImageDimensions(object);
 */
T4Utils.media.getImageDimensions = function (mediaObj) {
    var dimensions = {
        width: 0,
        height: 0
    };
    dimensions.width = MediaUtils.getImageDimensions(mediaObj)[0];
    dimensions.height = MediaUtils.getImageDimensions(mediaObj)[1];
    return dimensions;
};

/**
 * Gets a media object by id
 * @function media.getMediaObject
 * @param {int} mediaID - The id of the media object desired
 * @returns {object} a media object
 * @example
 * T4Utils.media.getMediaObject(int);
 */
T4Utils.media.getMediaObject = function (mediaID) {
    return MediaManager.getManager().get(dbStatement.getConnection(), mediaID, language);
};
