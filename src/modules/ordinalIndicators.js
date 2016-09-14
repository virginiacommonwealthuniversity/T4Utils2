/**
 * ordinalIndicators - The Ordinal Indicators Module
 * @namespace ordinalIndicators
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @version 1.0.0
 * @example
 * T4Utils.ordinalIndicators
 */
T4Utils.ordinalIndicators = T4Utils.ordinalIndicators || {};

/**
 * Find if the position of the content within context to the page is the first of its kind
 * @function ordinalIndicators.pageFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.pageFirst;
 */
T4Utils.ordinalIndicators.pageFirst = (function() {
    var pageFirst = false;
    // Create function to delete excess array objects if they have identical keys...
    function unique(arr) {
        var comparer = function compareObject(a, b) {
            if (a.key === b.key) {
                return 0;
            } else {
                if (a.key < b.key) {
                    return -1;
                } else {
                    return 1;
                }
            }
        };
        arr.sort(comparer);
        var end;
        for (var i = 0; i < arr.length - 1; ++i) {
            if (comparer(arr[i], arr[i+1]) === 0) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    // Grab all pieces of content on the page
    var cL = com.terminalfour.sitemanager.cache.utils.CSHelper.extractCachedContent(
        com.terminalfour.sitemanager.cache.utils.CSHelper.removeSpecialContent(
            section.getContent(
                publishCache.getChannel(), 'en', com.terminalfour.sitemanager.cache.CachedContent.CURRENT, true
            )
        )
    );
    // Run through each piece of content, find out all the content types, and create a key array...
    var listContentTypeIDs = [];
    for (var j = 0; j < cL.length; j++) {
        var contentPiece = cL[j],
            pieceID = contentPiece.getContentTypeID();
        listContentTypeIDs.push({
            'key': pieceID,
            'pieces': []
        });
    }
    unique(listContentTypeIDs);
    // Run through each piece of content, and put them in their corresponding key object
    for (var k = 0; k < cL.length; k++) {
        var cP = cL[k],
            ctID = cP.getContentTypeID(),
            uID = cP.getID();
        for (var l = 0; l < listContentTypeIDs.length; l++) {
            var contentTypeID = listContentTypeIDs[l];
            if (ctID === contentTypeID.key) {
                var p = contentTypeID.pieces;
                p.push(uID);
            }
        }
    }
    // Get the current content type ID and unique ID
    var this_ctID = content.getContentTypeID(),
        this_uID = content.getID();
    // Set the pageFirst and pageLast values
    for (var m = 0; m < listContentTypeIDs.length; m++) {
        var typeID = listContentTypeIDs[m];
        // Find the current content piece in the array of all alike content on the page...
        if (typeID.key === this_ctID) {
            var pieces = typeID.pieces,
            pFirst = pieces[0];
            // If this piece of content is the first of its kind on the page...
            if (pFirst === this_uID) {
                pageFirst = true;
            } else {
                pageFirst = false;
            }
        }
    }
    return pageFirst;
})();

/**
 * Find if the position of the content within context to the page is the last of its kind
 * @function ordinalIndicators.pageLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.pageLast;
 */
T4Utils.ordinalIndicators.pageLast = (function() {
    var pageLast = false;
    // Create function to delete excess array objects if they have identical keys...
    function unique(arr) {
        var comparer = function compareObject(a, b) {
            if (a.key === b.key) {
                return 0;
            } else {
                if (a.key < b.key) {
                    return -1;
                } else {
                    return 1;
                }
            }
        };
        arr.sort(comparer);
        var end;
        for (var i = 0; i < arr.length - 1; ++i) {
            if (comparer(arr[i], arr[i+1]) === 0) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    // Grab all pieces of content on the page
    var cL = com.terminalfour.sitemanager.cache.utils.CSHelper.extractCachedContent(
        com.terminalfour.sitemanager.cache.utils.CSHelper.removeSpecialContent(
            section.getContent(
                publishCache.getChannel(), 'en', com.terminalfour.sitemanager.cache.CachedContent.CURRENT, true
            )
        )
    );
    // Run through each piece of content, find out all the content types, and create a key array...
    var listContentTypeIDs = [];
    for (var j = 0; j < cL.length; j++) {
        var contentPiece = cL[j],
            pieceID = contentPiece.getContentTypeID();
        listContentTypeIDs.push({
            'key': pieceID,
            'pieces': []
        });
    }
    unique(listContentTypeIDs);
    // Run through each piece of content, and put them in their corresponding key object
    for (var k = 0; k < cL.length; k++) {
        var cP = cL[k],
            ctID = cP.getContentTypeID(),
            uID = cP.getID();
        for (var l = 0; l < listContentTypeIDs.length; l++) {
            var contentTypeID = listContentTypeIDs[l];
            if (ctID === contentTypeID.key) {
                var p = contentTypeID.pieces;
                p.push(uID);
            }
        }
    }
    // Get the current content type ID and unique ID
    var this_ctID = content.getContentTypeID(),
        this_uID = content.getID();
    // Set the pageFirst and pageLast values
    for (var m = 0; m < listContentTypeIDs.length; m++) {
        var typeID = listContentTypeIDs[m];
        // Find the current content piece in the array of all alike content on the page...
        if (typeID.key === this_ctID) {
            var pieces = typeID.pieces,
            pLength = pieces.length,
            pIndex = pLength - 1,
            pLast = pieces[pIndex];
            // If this piece of content is the last of its kind on the page...
            if (pLast === this_uID) {
                pageLast = true;
            } else {
                pageLast = false;
            }
        }
    }
    return pageLast;
})();

/**
 * Find the index of the content within context to the page
 * @function ordinalIndicators.pageIndex
 * @returns {Number} a integer representing the contents positon on the page (starts from 0)
 * @example
 * T4Utils.ordinalIndicators.pageIndex;
 */
T4Utils.ordinalIndicators.pageIndex = (function() {
    var contentIndex;
    // Create function to delete excess array objects if they have identical keys...
    function unique(arr) {
        var comparer = function compareObject(a, b) {
            if (a.key === b.key) {
                return 0;
            } else {
                if (a.key < b.key) {
                    return -1;
                } else {
                    return 1;
                }
            }
        };
        arr.sort(comparer);
        var end;
        for (var i = 0; i < arr.length - 1; ++i) {
            if (comparer(arr[i], arr[i+1]) === 0) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
    // Grab all pieces of content on the page
    var cL = com.terminalfour.sitemanager.cache.utils.CSHelper.extractCachedContent(
        com.terminalfour.sitemanager.cache.utils.CSHelper.removeSpecialContent(
            section.getContent(
                publishCache.getChannel(), 'en', com.terminalfour.sitemanager.cache.CachedContent.CURRENT, true
            )
        )
    );
    // Run through each piece of content, find out all the content types, and create a key array...
    var listContentTypeIDs = [];
    for (var j = 0; j < cL.length; j++) {
        var contentPiece = cL[j],
            pieceID = contentPiece.getContentTypeID();
        listContentTypeIDs.push({
            'key': pieceID,
            'pieces': []
        });
    }
    unique(listContentTypeIDs);
    // Run through each piece of content, and put them in their corresponding key object
    for (var k = 0; k < cL.length; k++) {
        var cP = cL[k],
            ctID = cP.getContentTypeID(),
            uID = cP.getID();
        for (var l = 0; l < listContentTypeIDs.length; l++) {
            var contentTypeID = listContentTypeIDs[l];
            if (ctID === contentTypeID.key) {
                var p = contentTypeID.pieces;
                p.push(uID);
            }
        }
    }
    // Get the current content type ID and unique ID
    var this_ctID = content.getContentTypeID(),
        this_uID = content.getID();
    // Set the pageFirst and pageLast values
    for (var m = 0; m < listContentTypeIDs.length; m++) {
        var typeID = listContentTypeIDs[m];
        // Find the current content piece in the array of all alike content on the page...
        if (typeID.key === this_ctID) {
            var pieces = typeID.pieces,
            pLength = pieces.length;
            // Set the contentIndex variable...
            for (var n = 0; n < pLength; n++) {
                var piece = pieces[n];
                if (this_uID === piece) {
                    contentIndex = n;
                    break;
                }
            }
        }
    }
    return contentIndex;
})();

/**
 * Find if the position of the content within context to a group of the same content-type is the first of its kind
 * @function ordinalIndicators.groupFirst
 * @returns {Boolean} a boolean value; true if first, false if not
 * @example
 * T4Utils.ordinalIndicators.groupFirst;
 */
T4Utils.ordinalIndicators.groupFirst = (function() {
    var ctid = content.getContentTypeID(),
        sid = section.getID(),
        oCH = new ContentHierarchy(),
        oCM = com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager),
        contentInSection = oCH.getContent(dbStatement, sid, 'en'),
        groupFirst = false;
    for (var i = 0; i < contentInSection.length; i++) {
        if (content.getID() === oCM.get(contentInSection[i], 'en').getID()) {
            if (i === 0) {
                groupFirst = true;
            } else if (ctid !==  oCM.get(contentInSection[i - 1], 'en').getContentTypeID()) {
                groupFirst = true;
            } else {
                groupFirst = false;
            }
        }
    }
    return groupFirst;
})();

/**
 * Find if the position of the content within context to a group of the same content-type is the last of its kind
 * @function ordinalIndicators.groupLast
 * @returns {Boolean} a boolean value; true if last, false if not
 * @example
 * T4Utils.ordinalIndicators.groupLast;
 */
T4Utils.ordinalIndicators.groupLast = (function() {
    var ctid = content.getContentTypeID(),
        sid = section.getID(),
        oCH = new ContentHierarchy(),
        oCM = com.terminalfour.spring.ApplicationContextProvider.getBean(com.terminalfour.content.IContentManager),
        contentInSection = oCH.getContent(dbStatement, sid, 'en'),
        groupLast = false;
    for (var i = 0; i < contentInSection.length; i++) {
        if (content.getID() === oCM.get(contentInSection[i], 'en').getID()) {
            if (i === contentInSection.length-1) {
                groupLast = true;
            } else if (ctid !==  oCM.get(contentInSection[i + 1], 'en').getContentTypeID()) {
                groupLast = true;
            } else {
                groupLast = false;
            }
        }
    }
    return groupLast;
})();
