/**
 * The ordinal indicators Module
 * @namespace ordinalIndicators
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.1.0
 * @example
 * T4Utils.ordinalIndicators
 */

// Grab whether the context is the page or not
import { contextIsPage } from './base';

// Application context provider class
importClass(com.terminalfour.spring.ApplicationContextProvider);

// Content manager class
importClass(com.terminalfour.content.IContentManager);

// CS helper class
importClass(com.terminalfour.sitemanager.cache.utils.CSHelper);

// Cached content class
importClass(com.terminalfour.sitemanager.cache.CachedContent);

// Site manager package
importPackage(com.terminalfour.sitemanager);

// Content package
importPackage(com.terminalfour.content);

/**
 * Gets an array of page contents
 * @function ordinalIndicators.getCcontents
 * @param {?number} sectionID The section to grab page contents from
 * @returns {array} An array of page contents
 * @example
 * T4Utils.ordinalIndicators.getContents();
 */
export function getContents(sectionID = section.getID()) {
    // Create an instance of a content hierarchy...
    const contentHierarchy = new ContentHierarchy();
    // ... and content manager
    const contentManager = ApplicationContextProvider.getBean(IContentManager);

    // Return the page contents as objects
    return Array.from(
        contentHierarchy.getContent(
            dbStatement,
            sectionID,
            'en'
        )
    ).map(info => contentManager.get(info, 'en'));
}

/**
 * Gets the current content type's ID
 * @function ordinalIndicators.getCurrentContentTypeID
 * @returns {number} The current content type's ID
 * @example
 * T4Utils.ordinalIndicators.getCurrentContentTypeID();
 */
export function getCurrentContentTypeID() {
    // Return null when within the context of a page
    if (contextIsPage) return null;

    // Otherwise, return the current content type's ID
    return content.getContentTypeID();
}

/**
 * Get's the current content's ID
 * @function ordinalIndicators.getCurrentContentID
 * @returns {number} The current content's ID
 * @example
 * T4Utils.ordinalIndicators.getCurrentContentID();
 */
export function getCurrentContentID() {
    // Return null when within the context of a page
    if (contextIsPage) return null;

    // Otherwise, return the current content's ID
    return content.getID();
}

/**
 * Gets an array of siblings (contents of the same kind as the current content)
 * @function ordinalIndicators.getSiblings
 * @param {?object} information An object of content information
 * @param {?array} information.contents An array of contents (defaults to page contents)
 * @param {?number} information.contentTypeID The content type ID to match siblings against
 * @returns {array} An array of sibling content types
 * @example
 * T4Utils.ordinalIndicators.getSiblings();
 */
export function getSiblings({
    contents = getContents(),
    contentTypeID = getCurrentContentTypeID()
} = {}) {
    // Return the contents filtered for ones matching the content type ID
    return contents.filter(
        object => object.getContentTypeID() === contentTypeID
    );
}

/**
 * Gets an array of content page information
 * @function ordinalIndicators.getPageInfo
 * @param {?array} contents An array of contents (defaults to sibling contents)
 * @returns {array} An array of content page information
 * @example
 * T4Utils.ordinalIndicators.getPageInfo();
 */
export function getPageInfo(contents = getSiblings()) {
    // If there are no contents, return an empty array
    if (!contents.length) return [];

    // Otherwise, return the contents as page information
    return contents.map((object, index) => {
        // Grab the content object's ID,...
        const contentID = object.getID();
        // ... the total contents amount,...
        const count = contents.length;
        // ... and whether its first...
        const first = !index;
        // ... or last
        const last = index === contents.length - 1;

        // Finally, return all information as an object
        return {
            contentID,
            count,
            first,
            index,
            last
        };
    });
}

/**
 * Gets an array of content group information
 * @function ordinalIndicators.getGroupInfo
 * @param {?object} information An object of content information
 * @param {?array} information.contents An array of contents (defaults to page contents)
 * @param {?number} information.contentTypeID The content type ID to match siblings against
 * @returns {array} An array of content group information
 * @example
 * T4Utils.ordinalIndicators.getGroupInfo()
 */
export function getGroupInfo({
    contents = getContents(),
    contentTypeID = getCurrentContentTypeID()
} = {}) {
    // Initialize the group ID...
    let id = 0;
    // ... and offset
    let offset = 0;

    // Create an array of siblings...
    const siblings = contents
        .map((object, index) => {
            // If the piece of content isn't of the same kind,...
            if (object.getContentTypeID() !== contentTypeID) {
                // ... reset the group offset...
                offset = 0;
                // ... and return null
                return null;
            }

            // Grab the content object's ID
            const contentID = object.getID();

            // Grab the previous piece of content...
            const previous = index ? contents[index - 1] : null;
            // ... and whether it's a sibling (of the same kind)
            const previousIsSibling = previous ? previous.getContentTypeID() === contentTypeID : false;

            // Grab the next piece of content...
            const next = index < contents.length - 1 ? contents[index + 1] : null;
            // ... and whether it's a sibling (of the same kind)
            const nextIsSibling = next ? next.getContentTypeID() === contentTypeID : false;

            // Calculate whether this piece of content is the first...
            const first = previous && previousIsSibling ? false : true;
            // ... or last of a group
            const last = next && nextIsSibling ? false : true;

            // Set the group data...
            let data = {
                contentID,
                id,
                first,
                index: offset,
                last
            };
            // ... and increment the group offset
            offset++;

            // If the next piece of content isn't a sibling, increment the group ID
            if (!nextIsSibling) id++;

            // Finally, return the data
            return data;
        })
        .filter(Boolean);
    // ... and a map of all groups
    const map = siblings.reduce((array, { id }) => {
        array[id] ? array[id] += 1 : array[id] = 1;
        return array;
    }, []);

    // Finally, return the siblings with amount/count data added
    return siblings.map(data => {
        // Grab the amount of groups...
        const amount = map.length;
        // ... and how many are within the current group
        const count = map[data.id];

        // Return the data with amount/count added
        return {
            ...data,
            amount,
            count
        };
    });
}

/**
 * Gets page/group info for a specific piece of content
 * @function ordinalIndicators.getInfo
 * @param {?object} information An object of content information
 * @param {?number} information.sectionID The section ID to get content information from
 * @param {?number} information.contentTypeID The content type ID to match siblings against
 * @param {?number} information.contentID The content ID to filter results against
 * @returns {object} An object of page/group information of the given piece of content
 * @example
 * T4Utils.ordinalIndicators.getInfo()
 */
export function getInfo({
    sectionID = section.getID(),
    contentTypeID = getCurrentContentTypeID(),
    contentID: id = getCurrentContentID()
} = {}) {
    // Grab an array of page contents,...
    const contents = getContents(sectionID);
    // ... sibling content types...
    const siblings = getSiblings({ contents, contentTypeID });
    // ... and their page...
    const page = getPageInfo(siblings).find(({ contentID }) => contentID === id) || {};
    // ... and group info
    const group = getGroupInfo({ contents, contentTypeID }).find(({ contentID }) => contentID === id) || {};

    // Finally, return all data as an object
    return {
        id,
        page,
        group
    };
}

/**
 * Find information about the content within context to the page and group
 * @constant ordinalIndicators.info
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the page and group
 * @example
 * T4Utils.ordinalIndicators.info;
 */
export const info = getInfo();

/**
 * Find information about the content within context to the page
 * @constant ordinalIndicators.pageInfo
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the page
 * @example
 * T4Utils.ordinalIndicators.pageInfo;
 */
export const { page: pageInfo } = info;

/**
 * Find how many pieces of content of the same kind are on the page
 * @constant ordinalIndicators.pageCount
 * @returns {Number} an integer representing the amount of pieces of content of the same kind on the page
 * @example
 * T4Utils.ordinalIndicators.pageCount;
 */
export const { count: pageCount } = pageInfo;

/**
 * Find if the position of the content within context to the page is the first of its kind
 * @constant ordinalIndicators.pageFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.pageFirst;
 */
export const { first: pageFirst } = pageInfo;

/**
 * Find the index of the content within context to the page
 * @constant ordinalIndicators.pageIndex
 * @returns {Number} an integer representing the content's positon on the page (starts from 0)
 * @example
 * T4Utils.ordinalIndicators.pageIndex;
 */
export const { index: pageIndex } = pageInfo;

/**
 * Find if the position of the content within context to the page is the last of its kind
 * @constant ordinalIndicators.pageLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.pageLast;
 */
export const { last: pageLast } = pageInfo;

/**
 * Find information about the content within context to the group
 * @constant ordinalIndicators.groupInfo
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the group
 * @example
 * T4Utils.ordinalIndicators.groupInfo;
 */
export const { group: groupInfo } = info;

/**
 * Find how many groups of the content's kind are on the page
 * @constant ordinalIndicators.groupAmount
 * @returns {Number} an integer representing how many groups of the content's kind are on the page
 * @example
 * T4Utils.ordinalIndicators.groupAmount;
 */
export const { amount: groupAmount } = groupInfo;

/**
 * Find how many pieces of content are within the content's group
 * @constant ordinalIndicators.groupCount
 * @returns {Number} an integer representing how many pieces of content are withing the content's group
 * @example
 * T4Utils.ordinalIndicators.groupCount;
 */
export const { count: groupCount } = groupInfo;

/**
 * Find if the position of the content within context to a group of the same content-type is the first of its kind
 * @constant ordinalIndicators.groupFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.groupFirst;
 */
export const { first: groupFirst } = groupInfo;

/**
 * Find the id of the content's group
 * @constant ordinalIndicators.groupID
 * @returns {Number} an integer representing the id of the content's group
 * @example
 * T4Utils.ordinalIndicators.groupID;
 */
export const { id: groupID } = groupInfo;

/**
 * Find the index of the content within context of its group
 * @constant ordinalIndicators.groupIndex
 * @returns {Number} an integer representing the content's positon in the group (starts from 0)
 * @example
 * T4Utils.ordinalIndicators.groupIndex;
 */
export const { index: groupIndex } = groupInfo;

/**
 * Find if the position of the content within context to a group of the same content-type is the last of its kind
 * @constant ordinalIndicators.groupLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.groupLast;
 */
export const { last: groupLast } = groupInfo;
