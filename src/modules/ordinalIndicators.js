/**
 * ordinalIndicators - The Ordinal Indicators Module
 * @namespace ordinalIndicators
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.1.0
 * @example
 * T4Utils.ordinalIndicators
 */
T4Utils.ordinalIndicators = T4Utils.ordinalIndicators || {};

/**
 * Find the index of the content as well as the position of the content within context to the page if it is the first/last of its kind
 * @function ordinalIndicators.pageInfo
 * @returns {Object} an object containing boolean values for first/last as well as an integer value for index
 * @example
 * T4Utils.ordinalIndicators.pageInfo;
 */
T4Utils.ordinalIndicators.pageInfo = (function() {
    // Define the returned variables
    var pageCount, pageFirst, pageIndex, pageLast;
    // Create function to delete excess array objects if they have identical keys...
    function unique(array) {
        var comparer = function(a, b) {
            return a.key === b.key ? 0 : a.key < b.key ? -1 : 1;
        };
        array.sort(comparer);
        for (var i = 0; i < array.length - 1; ++i) {
            if (comparer(array[i], array[i+1]) === 0) array.splice(i, 1);
        }
        return array;
    }
    // If content is defined...
    if (typeof content !== 'undefined') {
        // Grab all pieces of content on the page
        var cL = com.terminalfour.sitemanager.cache.utils.CSHelper.extractCachedContent(                            /* Extract all cached content from the page where... */
            com.terminalfour.sitemanager.cache.utils.CSHelper.removeSpecialContent(                                 /* ... deleted content is ignored... */
                section.getContent(                                                                                 /* ... */
                    publishCache.getChannel(), 'en', com.terminalfour.sitemanager.cache.CachedContent.CURRENT, true /* ... and all other content is returned in the order as shown in SM */
                )
            )
        );
        // Define an array of key/pieces objects based on each unique content-type ID on the page
        var listContentTypeIDs = [];
        for (var j = 0; j < cL.length; j++) {
            var contentPiece = cL[j],
                pieceID = contentPiece.getTemplateID();
            listContentTypeIDs.push({
                key: pieceID,
                pieces: []
            });
        }
        unique(listContentTypeIDs);
        // Run through each piece of content, and put them in their corresponding key object pieces array
        for (var k = 0; k < cL.length; k++) {
            var cP = cL[k],
                ctID = cP.getTemplateID(),
                uID = cP.getID();
            for (var l = 0; l < listContentTypeIDs.length; l++) {
                var contentTypeID = listContentTypeIDs[l];
                if (ctID === contentTypeID.key) contentTypeID.pieces.push(uID);
            }
        }
        // Get the current content's...
        var this_ctID = content.getContentTypeID(), /* Content-type ID */
            this_uID = content.getID();             /* Unique ID */
        // For each key/pieces object...
        for (var m = 0; m < listContentTypeIDs.length; m++) {
            // ... create a reference, ...
            var typeID = listContentTypeIDs[m];
            // ... if the referenced object's key is equal to the current content's content-type ID...
            if (typeID.key === this_ctID) {
                // Define (of this content-type, in the scope of the entire page)...
                var pieces = typeID.pieces,      /* All content */
                    pFirst = pieces[0],          /* The first piece of content */
                    pLength = pieces.length,     /* The amount of pieces of content */
                    pLast = pieces[pLength - 1]; /* The last piece of content */
                // ... then assign values for pageCount, pageFirst, pageLast, and pageIndex based on the previously defined variables
                pageCount = pLength;
                pageFirst = pFirst === this_uID ? true : false;
                pageLast = pLast === this_uID ? true : false;
                for (var n = 0; n < pLength; n++) {
                    var piece = pieces[n];
                    if (this_uID === piece) {
                        pageIndex = n;
                        break; /* Break */
                    }
                }
                break; /* Break */
            }
        }
        // Return an object that contains...
        return {
            count: pageCount, /* (Integer) The amount of content of its kind on the page */
            first: pageFirst, /* (Boolean) First of its kind on the page? */
            index: pageIndex, /* (Integer) Position index of its kind on the page */
            last: pageLast    /* (Boolean) Last of its kind on the page? */
        };
    } else {
        // ... otherwise, return an object that contains null key/value pairs
        return {
            count: null,
            first: null,
            index: null,
            last: null
        };
    }
})();

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
 * @returns {Number} a integer representing the contents positon on the page (starts from 0)
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
 * Find if the position of the content within context to a group of the same content-type is the first/last of its kind
 * @function ordinalIndicators.groupInfo
 * @returns {Object} an object containing boolean values for first/last
 * @example
 * T4Utils.ordinalIndicators.groupInfo;
 */
T4Utils.ordinalIndicators.groupInfo = (function() {
    // If content is defined...
    if (typeof content !== 'undefined') {
        var ctid = content.getContentTypeID(),
            sid = section.getID(),
            oCH = new ContentHierarchy(),
            oCM = com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager),
            contentInSection = oCH.getContent(dbStatement, sid, 'en'),
            groupFirst, groupLast;
        for (var i = 0; i < contentInSection.length; i++) {
            if (content.getID() === oCM.get(contentInSection[i], 'en').getID()) {
                groupFirst = i === 0 ? true : ctid !== oCM.get(contentInSection[i - 1], 'en').getContentTypeID() ? true : false;
                groupLast = i === contentInSection.length - 1 ? true : ctid !== oCM.get(contentInSection[i + 1], 'en').getContentTypeID() ? true : false;
            }
        }
        // Return an object that contains...
        return {
            first: groupFirst, /* (Boolean) First of its kind in a group? */
            last: groupLast    /* (Boolean) Last of its kind in a group? */
        };
    } else {
        // ... otherwise, return an object that contains null key/value pairs
        return {
            first: null,
            last: null
        };
    }
})();

/**
 * Find if the position of the content within context to a group of the same content-type is the first of its kind
 * @function ordinalIndicators.groupFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.groupFirst;
 */
T4Utils.ordinalIndicators.groupFirst = T4Utils.ordinalIndicators.groupInfo.first;

/**
 * Find if the position of the content within context to a group of the same content-type is the last of its kind
 * @function ordinalIndicators.groupLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.groupLast;
 */
T4Utils.ordinalIndicators.groupLast = T4Utils.ordinalIndicators.groupInfo.last;
