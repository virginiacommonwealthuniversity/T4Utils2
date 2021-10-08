/**
 * ordinalIndicators - The Ordinal Indicators Module
 * @namespace ordinalIndicators
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 2.0.0
 * @example
 * T4Utils.ordinalIndicators
 */
T4Utils.ordinalIndicators = T4Utils.ordinalIndicators || {};

/**
 * Find information about the content within context to the page and group
 * @function ordinalIndicators.info
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the page and group
 * @example
 * T4Utils.ordinalIndicators.info;
 */
T4Utils.ordinalIndicators.info = (function() {
    // If content is defined...
    if (T4Utils.contextIsContent) {
        var contentTypeID = content.getContentTypeID(),
            sectionID =     section.getID(),
            contentID =     content.getID(),
            oCH =           new ContentHierarchy(),
            oCM =           com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager),
            pageContents =  oCH.getContent(dbStatement, sectionID, 'en'),
            sameContents =  [],
            calcContents =  [],
            pageCount =     0,
            offset =        0,
            groupID =       0,
            i, j, output;
        // Grab/store all content types of a kind
        for (i = 0; i < pageContents.length; i++) {
            var pageContent = oCM.get(pageContents[i], 'en');
            // If the page content's content-type ID matches the current content-type ID, push its ID/page-index to the sameContents array
            if (pageContent.getContentTypeID() === contentTypeID) sameContents.push({ id: pageContent.getID(), pageIndex: i });
        }
        // Set the initial state of the index offset...
        offset = sameContents[0].pageIndex;
        // ... and store the amount of content there is of this kind
        pageCount += sameContents.length;
        // Calculate/store page/group information of a kind
        for (j = 0; j < pageCount; j++) {
            var piece =      sameContents[j],
                pageIndex =  piece.pageIndex,
                pageFirst =  j === 0,
                pageLast =   j === pageCount - 1,
                groupFirst = false,
                groupLast =  false;
            // If this kind is not the first of its kind on the page...
            if (!pageFirst) {
                // Grab the previous kind
                var previousPiece = sameContents[j - 1];
                // If this kind's page index minus the previous kind's page index is greater than 1...
                if (pageIndex - previousPiece.pageIndex > 1) {
                    // ... adjust the offset,...
                    offset = pageIndex;
                    // ... this kind is the first of its group,...
                    groupFirst = true;
                    // ... and increment up the group ID
                    groupID++;
                }
            }
            // If this kind is not the last of its kind on the page...
            if (!pageLast) {
                // Grab the next kind
                var nextPiece = sameContents[j + 1];
                // If the next kind's page index minus this kind's page index is greater than 1, this kind is the last of its group
                if (nextPiece.pageIndex - pageIndex > 1) groupLast = true;
            }
            // Push the calculated content information as an object to the calcContents array
            calcContents.push({
                id:        piece.id,
                page: {
                    count: pageCount,
                    first: pageFirst,
                    index: pageIndex,
                    last:  pageLast
                },
                group: {
                    first: pageFirst || groupFirst,
                    id:    groupID,
                    index: pageIndex - offset,
                    last:  pageLast || groupLast
                }
            });
        }
        // Grab the current content's info and format it for return
        output = calcContents.filter(function (piece) {
            return piece.id === contentID;
        })[0];
        output.group.count = calcContents.filter(function (piece) {
            return piece.group.id === output.group.id;
        }).length;
        output.group.amount = calcContents[calcContents.length - 1].group.id + 1;
        delete output['id'];
        // Return the output
        return output;
    } else {
        // ... otherwise, return an object that contains null key/value pairs
        return {
            page: {
                count: null,
                first: null,
                index: null,
                last:  null
            },
            group: {
                amount: null,
                count:  null,
                first:  null,
                id:     null,
                index:  null,
                last:   null
            }
        };
    }
})();

/**
 * Find information about the content within context to the page
 * @function ordinalIndicators.pageInfo
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the page
 * @example
 * T4Utils.ordinalIndicators.pageInfo;
 */
T4Utils.ordinalIndicators.pageInfo = T4Utils.ordinalIndicators.info.page;

/**
 * Find how many pieces of content of the same kind are on the page
 * @member ordinalIndicators.pageCount
 * @returns {Number} an integer representing the amount of pieces of content of the same kind on the page
 * @example
 * T4Utils.ordinalIndicators.pageCount;
 */
T4Utils.ordinalIndicators.pageCount = T4Utils.ordinalIndicators.pageInfo.count;

/**
 * Find if the position of the content within context to the page is the first of its kind
 * @member ordinalIndicators.pageFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.pageFirst;
 */
T4Utils.ordinalIndicators.pageFirst = T4Utils.ordinalIndicators.pageInfo.first;

/**
 * Find the index of the content within context to the page
 * @member ordinalIndicators.pageIndex
 * @returns {Number} an integer representing the content's positon on the page (starts from 0)
 * @example
 * T4Utils.ordinalIndicators.pageIndex;
 */
T4Utils.ordinalIndicators.pageIndex = T4Utils.ordinalIndicators.pageInfo.index;

/**
 * Find if the position of the content within context to the page is the last of its kind
 * @member ordinalIndicators.pageLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.pageLast;
 */
T4Utils.ordinalIndicators.pageLast = T4Utils.ordinalIndicators.pageInfo.last;

/**
 * Find information about the content within context to the group
 * @function ordinalIndicators.groupInfo
 * @returns {Object} an object containing information such as index, count, first, last, etc. within context to the group
 * @example
 * T4Utils.ordinalIndicators.groupInfo;
 */
T4Utils.ordinalIndicators.groupInfo = T4Utils.ordinalIndicators.info.group;

/**
 * Find how many groups of the content's kind are on the page
 * @function ordinalIndicators.groupAmount
 * @returns {Number} an integer representing how many groups of the content's kind are on the page
 * @example
 * T4Utils.ordinalIndicators.groupAmount;
 */
T4Utils.ordinalIndicators.groupAmount = T4Utils.ordinalIndicators.groupInfo.amount;

/**
 * Find how many pieces of content are within the content's group
 * @function ordinalIndicators.groupCount
 * @returns {Number} an integer representing how many pieces of content are withing the content's group
 * @example
 * T4Utils.ordinalIndicators.groupCount;
 */
T4Utils.ordinalIndicators.groupCount = T4Utils.ordinalIndicators.groupInfo.count;

/**
 * Find if the position of the content within context to a group of the same content-type is the first of its kind
 * @function ordinalIndicators.groupFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.groupFirst;
 */
T4Utils.ordinalIndicators.groupFirst = T4Utils.ordinalIndicators.groupInfo.first;

/**
 * Find the id of the content's group
 * @function ordinalIndicators.groupID
 * @returns {Number} an integer representing the id of the content's group
 * @example
 * T4Utils.ordinalIndicators.groupID;
 */
T4Utils.ordinalIndicators.groupID = T4Utils.ordinalIndicators.groupInfo.id;

/**
 * Find the index of the content within context of its group
 * @function ordinalIndicators.groupIndex
 * @returns {Number} an integer representing the content's positon in the group (starts from 0)
 * @example
 * T4Utils.ordinalIndicators.groupIndex;
 */
T4Utils.ordinalIndicators.groupIndex = T4Utils.ordinalIndicators.groupInfo.index;

/**
 * Find if the position of the content within context to a group of the same content-type is the last of its kind
 * @function ordinalIndicators.groupLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.groupLast;
 */
T4Utils.ordinalIndicators.groupLast = T4Utils.ordinalIndicators.groupInfo.last;
