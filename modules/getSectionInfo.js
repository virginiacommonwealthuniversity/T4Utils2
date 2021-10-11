/**
 * The section information module
 * @namespace getSectionInfo
 * @extends T4Utils
 * @contributors Ben Margevicius <bdm4@case.edu>, Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.0.0
 * @example
 * T4Utils.getSectionInfo
 */

// Path builder package
importClass(com.terminalfour.publish.PathBuilder);

/**
 * Stores a link to a section
 * @example
 * T4Utils.getSectionInfo.publishLink
 */
export let publishLink;

/**
 * Sets a link to this section (no return; sets local 'publishLink' variable)
 * @function getSectionInfo.setPublishLink
 * @param {section} section The global section object
 * @returns {null} sets the getSectionInfo's publish link
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
 * @function getSectionInfo.getPublishLink
 * @param {section} section The global section object
 * @returns {string} the publishing Link
 * @example
 * T4Utils.getSectionInfo.getPublishLink();
 */
export function getPublishLink(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    return publishLink;
}

/**
 * Gets the section title for the section passed in
 * @function getSectionInfo.sectionTitle
 * @param {Object} section The global section object
 * @returns {string} the name of the section
 * @example
 * T4Utils.getSectionInfo.sectionTitle(section);
 */
export function sectionTitle(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    // Return the section's title
    return publishLink.getText();
}

/**
 * Gets the section link for the section passed in
 * @function getSectionInfo.sectionLink
 * @param {Object} section The global section object
 * @returns {string} the link to the section
 * @example
 * T4Utils.getSectionInfo.sectionLink(section);
 */
export function sectionLink(section) {
    // If no publish link has been set, set it
    setPublishLink(section);

    // Return the section's link
    return publishLink.getLink();
}

/**
 * Gets the section anchor link for the section passed in
 * @function getSectionInfo.anchorLink
 * @param {section} section The global section object
 * @returns {string} the HTML anchor link to the section
 * @example
 * T4Utils.getSectionInfo.anchorLink(section);
 */
export function anchorLink(section) {
    // Get the section's url...
    const url = sectionLink(section);
    // ... and text
    const text = sectionTitle(section);

    // Finally, return an anchor link with the url/text
    return `<a href="${ url }">${ text }</a>`;
}

/**
 * Gets the directory for the section passed in
 * @function getSectionInfo.getDirectory
 * @param {section} section The global section object
 * @returns {string} the directory on the filesystem that this section will be published to
 * @example
 * T4Utils.getSectionInfo.getDirectory(section);
 */
export function getDirectory(section) {
    return PathBuilder.getDirectory(
        section,
        publishCache,
        language
    ).toString();
}

/**
 * Gets the children for the section passed in
 * @function getSectionInfo.getChildren
 * @param {section} section The global section object
 * @param {?boolean} removeHidden If true, then the function will not return hidden sections
 * @returns {Array} an array of children of the passed in section
 * @example
 * T4Utils.getSectionInfo.getChildren(section, boolean);
 */
export function getChildren(section, removeHidden = false) {
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
 * @function getSectionInfo.getLevel
 * @param {Cachedsection} section The global section object
 * @returns {int} an integer of the level at which the section lives
 * @example
 * T4Utils.getSectionInfo.getLevel(section);
 */
export function getLevel(section) {
    return section.getLevel(publishCache.channel);
}

/**
 * Gets an array of paths until the specified level
 * @function getSectionInfo.getPathUntilLevel
 * @param {int} level How far down you want to traverse
 * @param {section} section The global section object
 * @param {Array} path Used for recursively finding the path to level
 * @returns {Array} an array of paths from the current section until we get to a certain level
 * @example
 * T4Utils.getSectionInfo.getPathUntilLevel(0, section); // Go until root
 * T4Utils.getSectionInfo.getPathUntilLevel(2, section); // Go until two levels up
 */
export function getPathUntilLevel(level, section, path = []) {
    // Push the given section into the path
    path.push(section);

    // Store the section's current level
    const currentLevel = getLevel(section);

    // If the final level if the current level, return the path
    if (level === currentLevel) return path;

    // Otherwise, get the parent of the section...
    const parentSection = section.getParent();
    // ... and recurse using it
    return getPathUntilLevel(level, parentSection, path);
}

/**
 * Gets the path to root from currentSection
 * @function getSectionInfo.getRootPath
 * @param {section} section - The global section object
 * @returns {Array} an array of sections until root (includes the current section)
 * @example
 * T4Utils.getSectionInfo.getRootPath(section);
 */
export function getRootPath(section) {
    return getPathUntilLevel(0, section);
}

/**
 * Gets a path from the current section until we are N steps up from root
 * @function getSectionInfo.getPathBySteps
 * @param {int} steps - How far up do you want to traverse
 * @param {section} section - The global section object
 * @param {Array} path - Used for recursively finding the path to finalLevel
 * @returns {Array} an array of paths from the current section until we get to a certain level
 * @example
 * T4Utils.getSectionInfo.getPathBySteps(1, section); // Go 1 step back, otherwise get the parent
 */
export function getPathBySteps(steps, section, path = []) {
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
