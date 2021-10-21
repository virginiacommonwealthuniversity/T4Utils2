/**
 * The section information module
 * @module getSectionInfo
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @example
 * T4Utils.getSectionInfo
 */

// Path builder package
importClass(com.terminalfour.publish.PathBuilder);

/**
 * Stores a link to a section
 * @var publishLink
 * @static
 * @type {null|string}
 * @example
 * T4Utils.getSectionInfo.publishLink
 */
export let publishLink;

/**
 * Sets a link to this section (no return; sets local 'publishLink' variable)
 * @function setPublishLink
 * @static
 * @param {section} section The section object
 * @returns {null} Sets the publish link
 * @example
 * T4Utils.getSectionInfo.setPublishLink(section);
 */
export function setPublishLink(section) {
    if (!publishLink || section) publishLink = PathBuilder.getLink(
        dbStatement,
        section,
        publishCache,
        language,
        isPreview
    );
}

/**
 * Gets the publish link from a local variable (requires setPublishLink)
 * @function getPublishLink
 * @static
 * @param {section} section The section object
 * @returns {string} The publishing Link
 * @example
 * T4Utils.getSectionInfo.getPublishLink();
 */
export function getPublishLink(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    // Otherwise, return the publish link
    return publishLink;
}

/**
 * Gets the section title for the section passed in
 * @function sectionTitle
 * @static
 * @param {Object} section The section object
 * @returns {string} The name of the section
 * @example
 * T4Utils.getSectionInfo.sectionTitle(section);
 */
export function sectionTitle(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    // If there's no publish link set, return null...
    if (!publishLink) return null;
    // ... otherwise, return the section's title
    return publishLink.getText();
}

/**
 * Gets the section link for the section passed in
 * @function sectionLink
 * @static
 * @param {Object} section The section object
 * @returns {string} The link to the section
 * @example
 * T4Utils.getSectionInfo.sectionLink(section);
 */
export function sectionLink(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    // If there's no publish link set, return null...
    if (!publishLink) return null;
    // ... otherwise, return the section's link
    return publishLink.getLink();
}

/**
 * Gets the section anchor link for the section passed in
 * @function anchorLink
 * @static
 * @param {section} section The section object
 * @returns {string} The HTML anchor link to the section
 * @example
 * T4Utils.getSectionInfo.anchorLink(section);
 */
export function anchorLink(section) {
    // Get the section's url...
    const url = sectionLink(section);
    // ... and text
    const text = sectionTitle(section);

    // If no URL/text was found, return null...
    if (!url || !text) return null;
    // ... otherwise, return an anchor link with the url/text
    return `<a href="${ url }">${ text }</a>`;
}

/**
 * Gets the directory for the section passed in
 * @function getDirectory
 * @static
 * @param {section} section The section object
 * @returns {string} The directory on the server that the section will publish to
 * @example
 * T4Utils.getSectionInfo.getDirectory(section);
 */
export function getDirectory(section) {
    // If no section was provided, return null...
    if (!section) return null;
    // ... otherwise, return the section's directory as a string
    return PathBuilder.getDirectory(
        section,
        publishCache,
        language
    ).toString();
}

/**
 * Gets the children for the section passed in
 * @function getChildren
 * @static
 * @param {section} section The section object
 * @param {?boolean} [removeHidden=false] Whether hidden sections should be removed
 * @returns {Array} An array of children of the passed in section
 * @example
 * T4Utils.getSectionInfo.getChildren(section, boolean);
 */
export function getChildren(section, removeHidden = false) {
    // If there isn't a section, return an empty array...
    if (!section) return [];
    // ... otherwise, return the section's children
    return Array.from(
        section.getChildren(
            publishCache.channel,
            language,
            removeHidden
        )
    );
}

/**
 * Gets the level at which the section lives
 * @function getLevel
 * @static
 * @param {Cachedsection} section The section object
 * @returns {int} An integer of the level at which the section lives
 * @example
 * T4Utils.getSectionInfo.getLevel(section);
 */
export function getLevel(section) {
    // If no section was provided, return null...
    if (!section) return null;
    // ... otherwise, return the provided section's level
    return section.getLevel(publishCache.channel);
}

/**
 * Gets an array of paths until the specified level
 * @function getPathUntilLevel
 * @static
 * @param {int} level The level to traverse until
 * @param {section} section The section object
 * @param {?Array} [path=[]] The path array for recursion
 * @returns {Array} An array of paths from the current section until the given level
 * @example
 * T4Utils.getSectionInfo.getPathUntilLevel(0, section); // Go until root
 * T4Utils.getSectionInfo.getPathUntilLevel(2, section); // Go until level 2
 */
export function getPathUntilLevel(level, section, path = []) {
    // If no section was provided, return the path
    if (!section) return path;

    // Push the given section into the path
    path.push(section);

    // Store the section's current level
    const currentLevel = getLevel(section);

    // If the final level if the current level, return the path
    if (currentLevel != 'undefined' && level === currentLevel) return path;

    // Otherwise, get the parent of the section...
    const parentSection = section.getParent();
    // ... and recurse using it
    return getPathUntilLevel(level, parentSection, path);
}

/**
 * Gets the path to root from currentSection
 * @function getRootPath
 * @static
 * @param {section} section The section object
 * @returns {Array} An array of sections until root (includes the current section)
 * @example
 * T4Utils.getSectionInfo.getRootPath(section);
 */
export function getRootPath(section) {
    return getPathUntilLevel(0, section);
}

/**
 * Gets a path from the current section until we are N steps up from root
 * @function getPathBySteps
 * @static
 * @param {int} steps How many steps up to traverse
 * @param {section} section The section object
 * @param {?Array} [path=[]] The path array for recursion
 * @returns {Array} An array of paths from the current section until n number of steps up
 * @example
 * T4Utils.getSectionInfo.getPathBySteps(1, section); // Go 1 step back, otherwise get the parent
 */
export function getPathBySteps(steps, section, path = []) {
    // If no section was provided, return the path
    if (!section) return path;

    // Push the given section into the path
    path.push(section);

    // If the path contains as many sections as steps, return the path
    if (path.length === steps) return path;

    // Grab the parent section...
    const parentSection = section.getParent();
    // ... and if doesn't exist, return the path
    if (!parentSection) return path;

    // Otherwise, recurse using the parent section
    return this.getPathBySteps(steps, parentSection, path);
}
