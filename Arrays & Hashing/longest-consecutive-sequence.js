class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        let longest = 0;
        let lengths = {};
        for (const num of nums) {
            if (lengths[num]) continue;

            const lbefore = lengths[num - 1] || 0;
            const lafter = lengths[num + 1] || 0;
            const l = lbefore + lafter + 1;

            lengths[num] = l;
            lengths[num - lbefore] = l;
            lengths[num + lafter] = l;

            if (longest < l) longest = l;
        }

        return longest;
    }
}