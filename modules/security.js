/**
 * security - The Security Module
 * @module security
 * @extends T4Utils
 * @author Joel Eisner <eisnerjr@vcu.edu>
 * @author Ben Margevicius <bdm4@case.edu>
 * @version 2.0.0
 * @example
 * T4Utils.security
 */

// Java language package
importPackage(java.lang);

// Java security package
importPackage(java.security);

/**
 * Hashes a plaintext string into a SHA-256 hex-encoded string
 * @function toSHA256
 * @static
 * @param {string} string A plaintext string
 * @returns {string} A string of the hash
 * @example
 * T4Utils.security.toSHA256(string);
 */
export function toSHA256(string) {
    let hash;

    try {
        const messageDigest = MessageDigest.getInstance('SHA-256');
        const bytes = new java.lang.String(string).getBytes('UTF-8');

        messageDigest.update(bytes);

        const hashedBytes = messageDigest.digest();
        const stringBuffer = new java.lang.StringBuffer();

        for (let byte = 0; byte < hashedBytes.length; byte++) {
            stringBuffer.append(
                java.lang.Integer.toString(
                    (hashedBytes[byte] & 0xff) + 0x100,
                    16
                ).substring(1)
            );
        }

        hash = stringBuffer.toString();
    } catch (e) {
        document.write(e);
    }

    return hash;
}
