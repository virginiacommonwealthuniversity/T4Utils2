/**
 * security - The Security Module
 * @namespace security
 * @extends T4Utils
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 1.0.0
 * @example
 * T4Utils.security
 */
T4Utils.security = T4Utils.security || {};

/**
 * Hashes a plaintext string into a SHA-256 hex-encoded string
 * @function security.toSHA256
 * @param {string} plainText - A plaintext string
 * @returns {string} a string value of the hash
 * @example
 * T4Utils.security.toSHA256(string);
 */
T4Utils.security.toSHA256 = function (plainText) {
    var hash;
    try {
        var md = MessageDigest.getInstance('SHA-256'),
            pwBytes = new java.lang.String(plainText).getBytes('UTF-8');
        md.update(pwBytes);
        var hashedBytes = md.digest(),
            sb = new java.lang.StringBuffer();
        for (var i = 0; i < hashedBytes.length; i++) {
            sb.append(java.lang.Integer.toString((hashedBytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        hash = sb.toString();
    } catch(e) {
        document.write(e);
    }
    return hash;
};
