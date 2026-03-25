class Solution {
    LENGTH_DELIMITER = ';'

    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let encoded = '';
        for (const str of strs) {
            encoded += str.length + this.LENGTH_DELIMITER + str;
        }
        return encoded;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        const decoded = [];
        for (let i = 0; i < str.length;) {
            // read length
            let lenStr = ''
            while (str[i] != this.LENGTH_DELIMITER) {
                lenStr += str[i++];
            }
            i++;

            // decode string
            const len = Number(lenStr);
            decoded.push(str.slice(i, i + len));
            i += len;
        }
        return decoded;
    }
}