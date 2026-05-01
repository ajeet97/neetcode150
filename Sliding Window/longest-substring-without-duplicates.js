class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        const duplicates = new Set();
        let longest = 0;
        for (let l = 0, r = 0; r < s.length; r++) {
            while (duplicates.has(s[r])) {
                duplicates.delete(s[l++]);
            }
            duplicates.add(s[r]);
            longest = Math.max(longest, r - l + 1);
        }
        return longest;
    }
}
