class Solution {
    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    groupAnagrams(strs) {
        const groups = {};
        for (const str of strs) {
            const key = this.sortLowercasedStr(str);
            if (!groups[key]) {
                groups[key] = [str];
            } else {
                groups[key].push(str);
            }
        }
        return Object.values(groups);
    }

    /**
     * @param {string} str
     * @returns {string}
     */
    sortLowercasedStr(str) {
        const count = new Array(26).fill(0);
        for (let i = 0; i < str.length; i++) {
            count[str.charCodeAt(i) - 97]++;
        }
        let sorted = '';
        for (let i = 0; i < 26; i++) {
            if (count[i]) {
                sorted += String.fromCharCode(97 + i).repeat(count[i]);
            }
        }
        return sorted;
    }
}
