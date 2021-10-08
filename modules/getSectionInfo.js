/**
 * getSectionInfo - The Section Information Module
 * @namespace getSectionInfo
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
 * @example
 * T4Utils.getSectionInfo
 */
T4Utils.getSectionInfo = T4Utils.getSectionInfo || {};

/**
 * Sets a link to this section (no return; sets local 'publishLink' variable)
 * @param {section} section - The global section object
 * @returns {null} sets the getSectionInfo's publish link
 * @example
 * T4Utils.getSectionInfo.setPublishLink(section);
 */
T4Utils.getSectionInfo.setPublishLink = function (section) {
    this.publishLink = PathBuilder.getLink(dbStatement, section, publishCache, language, isPreview);
};

/**
 * Gets the publish link from a local variable (requires setPublishLink)
 * @function getSectionInfo.getPublishLink
 * @returns {string} the publishing Link
 * @example
 * T4Utils.getSectionInfo.getPublishLink();
 */
T4Utils.getSectionInfo.getPublishLink = function () {return this.publishLink;};

/**
 * Gets the section title for the section passed in
 * @function getSectionInfo.sectionTitle
 * @param {Object} section - The global section object
 * @returns {string} the name of the section
 * @example
 * T4Utils.getSectionInfo.sectionTitle(section);
 */
T4Utils.getSectionInfo.sectionTitle = function (section) {
    this.setPublishLink(section);
    return this.publishLink.getText();
};

/**
 * Gets the section link for the section passed in
 * @function getSectionInfo.sectionLink
 * @param {Object} section - The global section object
 * @returns {string} the link to the section
 * @example
 * T4Utils.getSectionInfo.sectionLink(section);
 */
T4Utils.getSectionInfo.sectionLink = function (section) {
    this.setPublishLink(section);
    return this.publishLink.getLink();
};

/**
 * Gets the section link for the section passed in
 * @function getSectionInfo.anchorLink
 * @param {section} section - The global section object
 * @returns {string} the HTML anchor link to the section
 * @example
 * T4Utils.getSectionInfo.anchorLink(section);
 */
T4Utils.getSectionInfo.anchorLink = function (section) {
    this.setPublishLink(section);
    var url = this.publishLink.getLink(),
        text = this.publishLink.getText(),
        link = '<a href="' + url + '">' + text + '</a>';
    return link;
};

/**
 * Gets the directory for the section passed in
 * @function getSectionInfo.getDirectory
 * @param {section} section - The global section object
 * @returns {string} the directory on the filesystem that this section will be published to
 * @example
 * T4Utils.getSectionInfo.getDirectory(section);
 */
T4Utils.getSectionInfo.getDirectory = function (section) {
    return PathBuilder.getDirectory(section, publishCache, language).toString();
};

/**
 * Gets the children for the section passed in
 * @function getSectionInfo.getChildren
 * @param {section} section - The global section object
 * @param {boolean} isHiddenInNAV - if true, then the function will not return hidden sections
 * @returns {Array} an array of children of the passed in section
 * @example
 * T4Utils.getSectionInfo.getChildren(section, boolean);
 */
T4Utils.getSectionInfo.getChildren = function (section, isHiddenInNAV) {
    var hideHiddenSections = isHiddenInNAV || false;
    return section.getChildren(publishCache.channel, language, hideHiddenSections);
};

/**
 * Gets an array of paths until the specified level
 * @function getSectionInfo.getPathUntilLevel
 * @param {int} level - How far down you want to traverse
 * @param {section} section - The global section object
 * @param {Array} path - Used for recursively finding the path to level
 * @returns {Array} an array of paths from the current section until we get to a certain level
 * @example
 * T4Utils.getSectionInfo.getPathUntilLevel(0, section); // Go until root
 * T4Utils.getSectionInfo.getPathUntilLevel(2, section); // Go until two levels up
 */
T4Utils.getSectionInfo.getPathUntilLevel = function(level, section, path) {
    path = path || [];
    path.push(section);
    var currentLevel = section.getLevel(publishCache.channel);
    if(level < currentLevel) {
        var parentSection = currentSection.getParent();
        return this.getPathUntilLevel(level, parentSection, path);
    } else {
        return path;
    }
};

/**
 * Gets the path to root from currentSection
 * @function getSectionInfo.getRootPath
 * @param {section} section - The global section object
 * @returns {Array} an array of sections until root (includes the current section)
 * @example
 * T4Utils.getSectionInfo.getRootPath(section);
 */
T4Utils.getSectionInfo.getRootPath = function (section) {
    return this.getPathUntilLevel(0, section);
};

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
T4Utils.getSectionInfo.getPathBySteps = function(steps, section, path) {
    path = path || [];
    path.push(section);
    if (path.length < steps) {
        var parentSection = section.getParent();
        if ( parentSection === null ) {
            return path;
        } else {
            return this.getPathBySteps(steps, parentSection, path);
        }
    } else {
        return path;
    }
};

/**
 * Gets the level at which the section lives
 * @function getSectionInfo.getLevel
 * @param {Cachedsection} section - The global section object
 * @returns {int} an integer of the level at which the section lives
 * @example
 * T4Utils.getSectionInfo.getLevel(section);
 */
T4Utils.getSectionInfo.getLevel = function (section) {
    return section.getLevel(publishCache.channel);
};
